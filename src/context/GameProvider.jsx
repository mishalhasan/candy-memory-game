import { GameContext } from "./GameContext";
import { useGameEngine } from "../hooks/useGameEngine";

/**
 * Provides global game state and handlers to the component tree via GameContext.
 * All state logic lives in useGameEngine.
 */export const GameProvider = ({ children }) => {
  const {
    loading,
    error,
    cards,
    cardsClickable,
    handleCardClick,
    isGameOver,
    handleGameReset,
    moves,
    elapsedTime,
    handleGameStart,
    handleAPIReset,
    gameState,
    handleGameState,
    handlePlayBgMusic,
    handleMute,
    audioMute,
    handleStopBgMusic,
    handleGameEnd,
  } = useGameEngine();

  return (
    <GameContext.Provider
      value={{
        loading,
        error,
        cards,
        cardsClickable,
        handleCardClick,
        isGameOver,
        handleGameReset,
        moves,
        elapsedTime,
        handleGameStart,
        handleAPIReset,
        gameState,
        handleGameState,
        handlePlayBgMusic,
        handleMute,
        audioMute,
        handleStopBgMusic,
        handleGameEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
