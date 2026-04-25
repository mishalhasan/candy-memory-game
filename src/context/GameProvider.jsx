import { useState } from "react";
import { GameContext } from "./GameContext";
import { useGameEngine } from "../hooks/useGameEngine";
// Create provider
export const GameProvider = ({ children }) => {
  const {
    cards,
    setCards,
    loading,
    error,
    cardsClickable,
    moves,
    setCardsClickable,
    firstCardID,
    setFirstCardID,
    startTimestamp,
    setStartTimestamp,
    elapsedTime,
    setElapsedTime,
    handleCardClick,
    isGameOver,
    handleGameReset,
    handleGameStart,
    handleAPIReset,
    gameState,
    setGameState,
    handleGameState,
    handlePlayBgMusic,
    handleMute,
    audioMute,
    setAudioMute,
    audioRef,
  } = useGameEngine();

  return (
    <GameContext.Provider
      value={{
        cards,
        setCards,
        loading,
        error,
        cardsClickable,
        moves,
        startTimestamp,
        setStartTimestamp,
        setCardsClickable,
        firstCardID,
        setFirstCardID,
        elapsedTime,
        setElapsedTime,
        handleCardClick,
        isGameOver,
        handleGameReset,
        handleGameStart,
        handleAPIReset,
        gameState,
        setGameState,
        handleGameState,
        handlePlayBgMusic,
        handleMute,
        audioMute,
        setAudioMute,
        audioRef,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
