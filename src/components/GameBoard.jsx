import Card from "./Card.jsx";

export default function GameBoard({ cards, handleCardClick, cardsClickable }) {
  return (
    <main className="w-full backdrop-blur-sm flex justify-center px-10 ">
      <div
        className="
        rounded-2xl flex flex-wrap justify-center gap-4 h-fit w-full lg:grid lg:grid-cols-6 lg:justify-items-center max-w-[1600px] lg:mx-auto "
      >
        {cards.map((card) => (
          <Card
            key={card.uniqueID}
            card={card}
            handleCardClick={handleCardClick}
            cardsClickable={cardsClickable}
          />
        ))}
      </div>
    </main>
  );
}
