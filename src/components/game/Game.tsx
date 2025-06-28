import { useState } from "react";
import { shuffleDeck } from '../../utils/deckMangement.js';
import Deck from "../deck/Deck.js";
import { Card } from "../../types/card.js";

const Game = () => {
    function sumCard(hand: Card[]): number {
        let sum = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value == 'king' || hand[i].value == 'queen' || hand[i].value == 'jack') {
                sum += 10;
            }
            else if (hand[i].value == 'ace') {
                const sumWithoutAce = sumCard(hand.filter(card => card.value != 'ace'));
                if (sumWithoutAce + 11 > 21) {
                    sum += 1;
                }
                else {
                    sum += 11;
                }
            }
            else {
                sum += Number.parseInt(hand[i].value);
            }
        }
        return sum;
    }

    const [deck, setDeck] = useState<Card[]>(shuffleDeck());
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);

    const handleDeal = () => {
        const firstCard = deck[0];
        deck.shift();
        if (playerHand.length != dealerHand.length) {
            setDealerHand(dealerHand => [...dealerHand, firstCard])
        }
        else {
            setPlayerHand(playerHand => [...playerHand, firstCard]);
        }
        setDeck(deck => [...deck]);
    }
    return (
        <>
            <section className="board">
                <section className="dealer-side">
                    <div >
                        <Deck currentDeck={deck} />
                        <div>
                            card count: {deck.length}
                        </div>
                    </div>
                    <div className="dealer-hand-container">
                        Dealer hand: {sumCard(dealerHand)}
                        <div className="dealer-hand">
                            {
                                dealerHand.map((card, i) => (
                                    <img src={`src\\assets\\svg_playing_cards\\fronts\\${card.suit}_${card.value}.svg`} key={i} className={i % 2 == 0? 'card': ''} />
                                ))
                            }
                        </div>
                    </div>
                </section>
                <search className="game-options">
                    <button className="deal" onClick={handleDeal} disabled={deck.length == 0 || (playerHand.length == 2 && dealerHand.length == 2)}>Deal</button>

                </search>
                <section className="player-side">
                    player side
                    {
                        playerHand.map((card, i) => (
                            <img src={`src\\assets\\svg_playing_cards\\fronts\\${card.suit}_${card.value}.svg`} key={i} className={`${card.suit} - ${card.value}`} />
                        ))
                    }
                    <div>
                        Player hand: {sumCard(playerHand)}
                    </div>
                </section>
            </section>
        </>
    )
};

export default Game;
