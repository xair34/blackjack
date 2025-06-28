import { Card } from "../types/card";

export function initialDeck(){

}

export function shuffleDeck(): Card[] {
  const suits = ["spades", "hearts", "diamonds", "clubs"];
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
    "jack",
    "queen",
    "king",
    "ace",
  ];

  const deck = [];
  
  for(let i = 0; i < suits.length; i++){
    const currentSuit = suits[i];
    for(let j = 0; j < cardValues.length; j++){
      deck.push({suit: currentSuit, value: cardValues[j]});
    }
  }
  
  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
  return shuffledDeck;
}

export function dealCards(deck:string[]) {
  const firstCard = deck.shift();
  return { firstCard, deck };
}
