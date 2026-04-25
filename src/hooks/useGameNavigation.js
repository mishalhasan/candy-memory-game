import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export function useGameNavigation() {
  const navigate = useNavigate();
  const {
    handleGameReset,
    handleGameStart,
    handleAPIReset,
    handlePlayBgMusic,
    error,
  } = useContext(GameContext);

  const goHome = () => {
    navigate("/");
  };

  const restartGame = () => {
    handleGameReset();
    navigate("/game");
    if (!error) handlePlayBgMusic();
     console.log("REPLAY CLICKED");
     console.trace("REPLAY STACK");
  };

  const apiReset = () => {
    handleAPIReset();
    navigate("/game");
    if (!error) handlePlayBgMusic();
     console.log("REPLAY CLICKED");
     console.trace("REPLAY STACK");
  };

  const startGame = () => {
    handleGameStart();
    navigate("/game");
    if (!error) handlePlayBgMusic();
     console.log("REPLAY CLICKED");
     console.trace("REPLAY STACK");
  };

  return {
    goHome,
    restartGame,
    startGame,
    apiReset,
  };
}
