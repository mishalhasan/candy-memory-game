import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { saveBestTime } from "../utils/helpers.js";

export function useGameEnd() {
  const {
    elapsedTime,
    setStartTimestamp,
    isGameOver,
    cards,
    setGameState,
    audioRef,
  } = useContext(GameContext);
  const navigate = useNavigate();

  //Ensures redirection to gameOver page when game is over
  useEffect(() => {
    if (!isGameOver) return;

    //Stop timer
    setStartTimestamp(null);

    //Save elapsed time in local storage if new record
    saveBestTime(elapsedTime);

    //update GameState
    setGameState("ended");

    //stop song
    // audioRef.current.pause();
    // audioRef.current.currentTime = 0;

    //Adds a small delay for UX improvement
    const timer = setTimeout(() => {
      navigate("/game-over");
    }, 600);

    return () => clearTimeout(timer);
  }, [cards, navigate]);
}
