import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

/**
 * Handles navigation between pages with associated game/audio state changes.
 */
export function useGameNavigation() {
  const navigate = useNavigate();
  const {
    handleGameReset,
    handleGameStart,
    handleAPIReset,
    handlePlayBgMusic,
    handleStopBgMusic,
    error,
  } = useContext(GameContext);

  const goHome = () => {
    handleStopBgMusic();
    navigate("/");
  };

  const restartGame = () => {
    handleGameReset();
    navigate("/game");
    handlePlayBgMusic();
  };

  const apiReset = () => {
    handleAPIReset();
    navigate("/game");
    handlePlayBgMusic();
  };

  const startGame = () => {
    handleGameStart();
    navigate("/game");
    if (!error) handlePlayBgMusic();
  };

  return {
    goHome,
    restartGame,
    startGame,
    apiReset,
  };
}
