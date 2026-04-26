import { useGameNavigation } from "../hooks/useGameNavigation";
import bgImage from "../assets/imgs/candyland_bg.png";

export default function Home() {
  const { startGame } = useGameNavigation();

  return (
    <div
      className="flex flex-col h-screen justify-center items-center gap-10 bg-pink-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-pink-100/70" />

      <div className="relative flex flex-col items-center gap-10">
        <h1 className="text-4xl font-cursive font-bold text-pink-500 text-center">
          Welcome to Candy Land
        </h1>

        <div className="backdrop-blur-sm px-6 py-4 rounded-xl shadow-md text-center text-pink-700 max-w-xs">
          <h2 className="font-emphasis font-semibold mb-2">Instructions</h2>
          <p className="font-body text-sm">
            Flip cards to find matching pairs. Find all pairs to win.
          </p>
        </div>

        <button
          onClick={startGame}
          className="font-emphasis px-8 py-4 bg-pink-200 text-pink-800 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200 "
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
