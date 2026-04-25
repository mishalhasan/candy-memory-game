import { useGameNavigation } from "../hooks/useGameNavigation";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function Footer() {
  const { goHome } = useGameNavigation();
  const {
    handleGameState,
    gameState,
    handleGameReset,
    handleMute,
    audioMute,
  } = useContext(GameContext);

  return (
    <footer className=" rounded-lg backdrop-blur-md z-10 px-4 py-3 flex justify-center gap-6">
      <button
        onClick={() => {
          goHome();
          handleGameReset();
        }}
        className="w-14 h-14 flex items-center justify-center bg-amber-200/90 text-pink-600 rounded-full shadow-md hover:bg-amber-300 active:scale-95 transition"
      >
        <span className="material-symbols-rounded text-2xl">home</span>
      </button>

      <button
        onClick={handleGameState}
        className="w-16 h-16 flex items-center justify-center bg-amber-200/90 text-pink-700 rounded-full shadow-lg hover:bg-amber-300 active:scale-95 transition"
      >
        <span className="material-symbols-rounded text-3xl">
          {gameState === "paused" ? "play_arrow" : "pause"}
        </span>
      </button>

      <button
        onClick={handleMute}
        className="w-14 h-14 flex items-center justify-center bg-amber-200/90 text-pink-600 rounded-full shadow-md hover:bg-amber-300 active:scale-95 transition"
      >
        <span className="material-symbols-rounded text-2xl">
          {" "}
          {audioMute ? "volume_off" : "volume_up"}
        </span>
      </button>
    </footer>
  );
}
