export function shuffleDeck() {
  const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const deck = suits.flatMap((cardSuit) =>
    cardValues.map((card) => `${card} of ${cardSuit}`)
  );
  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
  return shuffledDeck;
}

export function dealCards(deck:string[]) {
  const firstCard = deck.shift();
  return { firstCard, deck };
}
