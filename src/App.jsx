import { Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameProvider";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";

export default function App() {
  return (
    <>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-over" element={<GameOver />} />
        </Routes>
      </GameProvider>
    </>
  );
}
