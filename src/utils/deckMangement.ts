import { Card } from "../types/card";
import { Suits } from "../types/suits";
const cardValues = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "jack", "queen", "king", "ace"
];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of Object.values(Suits)) {
    for (const value of cardValues) {
      deck.push({ suit, value });
    }
  }
  shuffleDeck(deck);
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function dealCard(deck: Card[]): { card: Card; newDeck: Card[] } {
  const [card, ...newDeck] = deck;
  return { card, newDeck };
}
