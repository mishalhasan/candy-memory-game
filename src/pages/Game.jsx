import { GameContext } from "../context/GameContext.jsx";
import { useContext } from "react";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import GameBoard from "../components/GameBoard.jsx";
import { formatTime } from "../utils/helpers";
import { useGameEnd } from "../hooks/useGameEnd.js";

export default function Game() {
  //Load page props and setup game exit
  const { loading, error, elapsedTime, moves } = useContext(GameContext);
  useGameEnd();

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-pink-50 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 p-5 sm:p-2">
      {/* soft pink overlay  */}
      <div className=" fixed inset-0 bg-amber-100/20 z-0" />

      <div className="flex flex-col gap-8 items-center justify-center p-5 ">
        <Header elapsedTime={formatTime(elapsedTime)} moves={moves} />
        <GameBoard />
        <Footer />
      </div>
    </div>
  );
}
