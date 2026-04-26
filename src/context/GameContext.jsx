import { createContext } from "react";

/**
 * Default context values — actual values provided by GameProvider via useGameEngine.
 */
export const GameContext = createContext({
  loading: false,
  error: false,
  cards: [],
  cardsClickable: true,
  moves: 0,
  elapsedTime: 0,
  gameState: "idle", // 'idle', 'playing', 'paused', 'ended'
  audioMute: false,

  handleCardClick: () => {},
  handleGameReset: () => {},
  handleGameStart: () => {},
  handleAPIReset: () => {},
  handleGameState: () => {},
  handlePlayBgMusic: () => {},
  handleStopBgMusic: () => {},
  handleGameEnd: () => {},
  handleMute: () => {},
});
