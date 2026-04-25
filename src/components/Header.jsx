
export default function Header({ elapsedTime, moves }) {
  return (
    <header className="flex flex-col gap-2 text-center">
      <h1 className="text-5xl font-bold text-pink-500 font-cursive">
        Candyland
      </h1>
      <div className=" font-emphasis flex gap-5 text-[#A78BFA] text-xl">
        <div>Timer: {elapsedTime === 0 ? "0:00" : elapsedTime} </div>
        <div> Moves: {moves}</div>
      </div>
    </header>
  );
}
