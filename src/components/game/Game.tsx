import { useState } from "react";
import { shuffleDeck } from '../../utils/deckMangement.js';
import Deck from "../deck/Deck.js";
import { Card } from "../../types/card.js";
import { Dealer } from "../../classes/Dealer.js";
import { Player } from "../../classes/Player.js";

export enum GameStates{
    Start = "start",
    PlayerTurns = "playerTurns",
    End = "end"
}

const Game = () => {
    const [deck, setDeck] = useState<Card[]>(shuffleDeck());
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [gameState, setGameState] = useState(GameStates.Start);
    const [dealer, setDealer] = useState<Dealer>(new Dealer());
    const [player, setPlayer] = useState<Player>(new Player(5000));

    const handleDeal = () => {
        setGameState(GameStates.PlayerTurns);
        const firstCard = deck[0];
        deck.shift();
        if (playerHand.length != dealerHand.length) {
            setDealerHand(dealerHand => [...dealerHand, firstCard])
            const updatedDealer = Object.assign(Object.create(Object.getPrototypeOf(dealer)), dealer);
            updatedDealer.addCard(firstCard);
            setDealer(updatedDealer);
        }
        else {
            setPlayerHand(playerHand => [...playerHand, firstCard]);
            const updatedPlayer = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
            updatedPlayer.addCard(firstCard);
            setPlayer(updatedPlayer);
        }
        console.log(player.canHit())
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
                        Dealer hand: {dealer.getHandValue(gameState)}
                        <div className="dealer-hand">
                            {
                                dealerHand.map((card, i) => (
                                    <img src={i % 2 == 0 ? `src\\assets\\svg_playing_cards\\fronts\\${card.suit}_${card.value}.svg` : 'src\\assets\\svg_playing_cards\\backs\\red2.svg' } key={i} className={i % 2 == 0 ? '' : 'card'} />
                                ))
                            }
                        </div>
                    </div>
                </section>
                <search className="game-options">
                    <button className="deal" onClick={handleDeal} disabled={deck.length == 0 || (playerHand.length == 2 && dealerHand.length == 2)}>Deal</button>
                    <button className="hit" onClick={handleDeal} disabled={!player.canHit()}>Hit</button>
                    
                </search>
                <section className="player-side">
                    {
                        playerHand.map((card, i) => (
                            <img src={`src\\assets\\svg_playing_cards\\fronts\\${card.suit}_${card.value}.svg`} key={i} className={`${card.suit} - ${card.value}`} />
                        ))
                    }
                    <div>
                        Player hand: {player.getHandValue()}
                    </div>
                </section>
            </section>
        </>
    )
};

export default Game;
