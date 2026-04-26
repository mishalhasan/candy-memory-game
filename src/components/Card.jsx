export default function Card({ card, handleCardClick, cardsClickable }) {
  
  const opacity = card.isFlipped ? "opacity-100" : "opacity-0";
  const interactionStateView = cardsClickable
    ? "cursor-pointer hover:scale-105"
    : "cursor-not-allowed";

  return (
    <div
      inert={!cardsClickable} // inert disables all interaction including keyboard when cards are non-clickable
      className={`select-none w-full min-w-[130px] max-w-[150px] aspect-square bg-rose-50 rounded-lg transition-transform ${interactionStateView}`}
      data-description={card.description}
      data-photographer={card.photographer}
      data-photographer-link={card.profileUrl}
      role="group"
      aria-label={`Photo by ${card.photographer}: ${card.description}`}
      onMouseDown={() => handleCardClick(card)} // onMouseDown used over onClick to improve UX
    >
      <img
        className={`w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-200 ${opacity}`}
        src={card.imgUrl}
        alt={card.description}
        draggable={false}
      />
    </div>
  );
}
