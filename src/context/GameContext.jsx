import { createContext } from "react";

export const GameContext = createContext({
  score: 0, // default value
  cardPair: [null, null],
  loading: false,
  error: false,
  cards: [],
  cardsClickable: true,
  moves: 0,
  firstCardID: null,
  startTimestamp: null,
  elapsedTime: 0,
  setStartTimestamp: () => {},
  setFirstCardID: () => {},
  setScore: () => {},
  setCardPair: () => {},
  setLoading: () => {},
  setError: () => {},
  setCards: () => {},
  setCardsClickable: () => {},
  setMoves: () => {},
  setElapsedTime: () => {},
});
