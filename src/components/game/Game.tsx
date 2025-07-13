import { useState } from "react";
import { createDeck, shuffleDeck, dealCard } from "../../utils/deckMangement.js";
import Deck from "../deck/Deck.js";
import { Card } from "../../types/card.js";
import { Dealer } from "../../classes/Dealer.js";
import { Player } from "../../classes/Player.js";

enum GameStates {
  Start,
  DealingCards,
  PlayerTurn
}

const Game = () => {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState(GameStates.Start);
  const [dealer, setDealer] = useState<Dealer>(new Dealer());
  const [player, setPlayer] = useState<Player>(new Player(5000));

  const handleStart = () => {
    const newDeck = [...deck];
    const newPlayer = new Player(2000);
    const newDealer = new Dealer();
    const newPlayerHand: Card[] = [];
    const newDealerHand: Card[] = [];

    for (let i = 0; i < 4; i++) {
      const { card, newDeck: updatedDeck } = dealCard(newDeck);
      if (!card) break;

      if (i % 2 === 0) {
        newPlayerHand.push(card);
        newPlayer.addCard(card);
      } else {
        newDealerHand.push(card);
        newDealer.addCard(card);
      }
      newDeck.splice(0, 1);
    }

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayer(newPlayer);
    setDealer(newDealer);
    setGameState(GameStates.PlayerTurn);
  };

  const handleSingleDeal = () => {
    if (deck.length === 0) return;

    const { card, newDeck } = dealCard(deck);
    if (!card) return;

    const updatedPlayer = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
    updatedPlayer.addCard(card);

    setPlayerHand([...playerHand, card]);
    setPlayer(updatedPlayer);
    setDeck(newDeck);

    if (!updatedPlayer.isBusted()) {
      setGameState(GameStates.PlayerTurn);
    }
  };

  return (
    <section className="board">
      <section className="dealer-side">
        <Deck currentDeck={deck} />
        <div>card count: {deck.length}</div>

        <div className="dealer-hand-container">
          Dealer hand: {dealer.handValue}
          <div className="dealer-hand">
            {dealerHand.map((card, i) => (
              <img
                key={i}
                src={
                  i % 2 === 0
                    ? `src/assets/svg_playing_cards/fronts/${card.suit}_${card.value}.svg`
                    : "src/assets/svg_playing_cards/backs/red2.svg"
                }
                className={i % 2 === 0 ? "" : "card"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="game-options">
        <div>
          <button className="deal" onClick={handleStart} disabled={gameState === GameStates.PlayerTurn}>
            Start
          </button>
        </div>
        <div>
          <button
            className="deal"
            onClick={handleSingleDeal}
            disabled={gameState !== GameStates.PlayerTurn || player.isBusted()}
          >
            Hit me
          </button>
        </div>
        <div>
          <button className="deal" disabled={!player.isBusted()}>Reset</button>
        </div>
        <p>{player.isBusted() ? "Player is busted!" : ""}</p>
      </section>

      <section className="player-side">
        {playerHand.map((card, i) => (
          <img
            key={i}
            src={`src/assets/svg_playing_cards/fronts/${card.suit}_${card.value}.svg`}
            className={`${card.suit}-${card.value}`}
          />
        ))}
        <div>Player hand: {player.handValue}</div>
      </section>
    </section>
  );
};

export default Game;
