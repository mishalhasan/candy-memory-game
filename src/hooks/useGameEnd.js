import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { saveBestTime } from "../utils/helpers.js";

export function useGameEnd() {
  const { elapsedTime, isGameOver, handleGameEnd } = useContext(GameContext);
  const navigate = useNavigate();

  /**
   * Handles end of game logic when all pairs are matched.
   * Listens for isGameOver and navigates to game over page.
   * Saves best time and triggers game end state.
   */
  useEffect(() => {
    if (!isGameOver) return;

    saveBestTime(elapsedTime);

    handleGameEnd();

    //Adds a small delay for UX improvement
    const timer = setTimeout(() => {
      navigate("/game-over");
    }, 600);

    return () => clearTimeout(timer);
  }, [isGameOver]);
}
