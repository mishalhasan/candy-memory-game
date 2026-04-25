import { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../context/GameContext.jsx";
import { fetchCandyLandPhotos } from "../api/cards.js";
import bgAudio from "../assets/audio/candy-bg.mp3";

import {
  prepareCards,
  isValidCard,
  toggleCardStatus,
  delay,
  shuffle,
} from "../utils/helpers.js";

export const useGameEngine = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardsClickable, setCardsClickable] = useState(true);
  const [firstCardID, setFirstCardID] = useState(null);
  const [moves, setMoves] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState("idle"); //'idle', 'playing', 'paused', 'ended'
  const [audioMute, setAudioMute] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(bgAudio));

  /*** GAME SETUP/END ***/

  /*
   * Loading game data on initial page load
   */
  useEffect(() => {
    loadData();
  }, []);

  /*
   * Get images from Unsplash API
   */
  async function loadData() {
    try {
      //ensure API state initalized to default value
      setLoading(true);
      setError(false);

      const result = await fetchCandyLandPhotos(); // already processed
      const imgCards = prepareCards(result);
      if (imgCards) setCards(imgCards);
      console.log("imgCards", imgCards);
      console.log("cards", cards);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Boolean value for whether all matches found; signialing end of game.
   */
  const isGameOver = cards.length > 0 && cards.every((card) => card.isMatched);

  /*** TIMER FUNCTIONS ***/

  /**
   * Timer controlled by startTimestamp (updated only on game start and end) &
   * gameState to allow for pause of timer in middle of game. Gamestate triggers to
   * 'ended' in useGameEnd hook.
   */
  useEffect(() => {
    if (startTimestamp !== null && gameState === "playing") {
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTimestamp;
        setElapsedTime(elapsed);
      }, 1000); // runs every 1000ms (1 second)

      console.log("started interval:", intervalRef.current);
    }

    if (startTimestamp === null || gameState === "paused") {
      clearInterval(intervalRef.current);
    }
  }, [startTimestamp, gameState]);

  /**
   * Sets fixed time state variable to current time
   */
  const startTimer = () => {
    if (startTimestamp !== null) return; // already running
    setStartTimestamp(Date.now());
    setGameState("playing");
  };

  /*** HANDLE FUNCTIONS ***/

  const handleGameReset = () => {
    setCards((prevCards) => {
      //Setup newCards
      let newCards = prevCards.map((prevCard) => ({
        ...prevCard,
        isFlipped: false,
        isMatched: false,
      }));
      return shuffle(newCards);
    });

    resetGameBoard();
  };

  /**
   * Retry's API on error on page load
   */
  const handleAPIReset = async () => {
    await loadData();
    resetGameBoard();
  };

  const resetGameBoard = () => {
    setElapsedTime(0);
    setMoves(0);
    setStartTimestamp(null);
    setGameState("playing");
    setCardsClickable(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.muted = false;
  };

  const handleGameState = () => {
    //If innitial game i.e. actual timer has not began cannot start/stop timer
    if (startTimestamp === null) return;
    cardsClickable ? setCardsClickable(false) : setCardsClickable(true);

    if (gameState === "playing") setGameState("paused");
    else if (gameState === "paused") {
      //Reset start time to avoid time jump when resuming
      setStartTimestamp(Date.now() - elapsedTime);
      setGameState("playing");
    }
  };

  const handleMute = () => {
    setAudioMute((prev) => {
      const newMuted = !prev;
      audioRef.current.muted = newMuted;
      return newMuted;
    });
  };

  const handlePlayBgMusic = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; //always start from beginning
    audio.play();
    audio.loop = true;
    setAudioMute(false); //defensive check, ensures, audio is not muted
  };

  /**
   * Ensures that on game-exit, game is reset if user re-enters without triggering API reload
   */
  const handleGameStart = () => {
    if (isGameOver) handleGameReset();
  };

  const handleCardClick = async (card) => {
    //ignore invalid cards/states where user already clicked card
    if (
      !cardsClickable ||
      card.isFlipped ||
      card.isMatched ||
      !isValidCard(card)
    )
      return;

    //On first click should start timer, otherwise will do nothing
    startTimer();

    console.log("Clicked card:", card);

    setCardsClickable(false); // temporarily disable clicking

    //Increment # of moves
    setMoves((prev) => prev + 1);

    console.log(card.uniqueID);

    //Update clicked card flipped status
    setCards((prevCards) =>
      toggleCardStatus(prevCards, card.uniqueID, "isFlipped", true),
    );

    //Check if card1 is selected or card 2 by user
    if (firstCardID === null) {
      console.log("testing card 1");

      //Add card as first pair of cardPair
      setFirstCardID(card.uniqueID);
    } else {
      console.log("card 2 testing");

      //Get firstCard data
      const firstCard = cards.find((card) => card.uniqueID === firstCardID);

      //check for match
      if (firstCard && card.imgID === firstCard.imgID) {
        //Update match status
        setCards((prevCards) => {
          const updatedCard1 = toggleCardStatus(
            prevCards,
            card.uniqueID,
            "isMatched",
            true,
          );

          const updatedCard2 = toggleCardStatus(
            updatedCard1,
            firstCardID,
            "isMatched",
            true,
          );

          return updatedCard2;
        });
      } else {
        await delay(1150);

        //Reset Cards: flip cards back
        setCards((prevCards) => {
          let updated = toggleCardStatus(
            prevCards,
            card.uniqueID,
            "isFlipped",
            false,
          );
          return toggleCardStatus(updated, firstCardID, "isFlipped", false);
        });
      }
      //Reset firstCardID - done last, after not being used anymore
      setFirstCardID(null);
    }

    setCardsClickable(true); // re-enable clicking after updating state
  };

  return {
    loading,
    error,
    cards,
    setCards,
    cardsClickable,
    setCardsClickable,
    firstCardID,
    setFirstCardID,
    handleCardClick,
    isGameOver,
    handleGameReset,
    moves,
    setMoves,
    startTimestamp,
    setStartTimestamp,
    elapsedTime,
    setElapsedTime,
    handleGameStart,
    handleAPIReset,
    gameState,
    setGameState,
    handleGameState,
    handlePlayBgMusic,
    handleMute,
    audioMute,
    setAudioMute, //unused
    audioRef,
  };
};
