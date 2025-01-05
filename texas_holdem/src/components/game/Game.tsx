import { useEffect, useState } from "react";
import Player from "../player/Player";
import { shuffleDeck, dealCards } from '../../utils/deckMangement.js';

type PlayerType = {
    id: number,
    name: string,
    money: number,
    cards: string[]
}
enum GameState{
    intialBets = "Compulsory bets",
    preFlop = "Pre-flop",
    flop = "Flop",
    turn = "Turn",
    river = "River",
    showdown = "Showdown"
}

const Game = () => {
    const [playerCount, setPlayerCount] = useState(2);
    const [deck, setDeck] = useState(shuffleDeck());
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [gameState, setGameState] = useState("");
    const [cardsOnTable, setCardsOnTable] = useState<string[]>([]);
    console.log(deck);
    useEffect(() => {
        const initialPlayers = Array.from({ length: playerCount }).map((_, i) => ({
            id: i,
            name: `Player ${i + 1}`,
            money: 15000,
            cards: [],
        }));
        setPlayers(initialPlayers);
        setGameState(GameState.intialBets);
    }, [playerCount]);

    const handleDealCards = () => {
        const newPlayers = [...players];
        let newDeck = [...deck];

        newPlayers.forEach((player, index) => {
            const dealt = dealCards(newDeck); 
            player.cards = [...player.cards, dealt.firstCard]; 
            newDeck = dealt.deck; 
        });

        setPlayers(newPlayers);
        setDeck(newDeck);

        console.log("Players after dealing cards:", newPlayers);
        console.log("Remaining deck:", newDeck);
    };
    const handleGame = () => {
        setGameState(GameState.flop);
    
        let flop = [];
        let currentDeck = [...deck]; 
    
        for (let i = 0; i < 3; i++) {
            const dealt = dealCards(currentDeck); 
            flop.push(dealt.firstCard); 
            currentDeck = dealt.deck; 
        }
    
        setDeck(currentDeck); 
        setCardsOnTable(flop); 
    };
    return (
        <>
        <h1>Game State: {gameState}</h1>
            {players.map((player) => (
                <Player
                    key={player.id}
                    name={player.name}
                    money={player.money}
                    cards={player.cards}
                />
            ))}
            <div>
                <h2>Game Board</h2>
                <div>
                    <h3>Cards: </h3>
                    <div className="game-board">
                        {cardsOnTable.map(card => {
                            return(<div>{card}</div>)
                        })}
                    </div>
                </div>
            </div>
            <button onClick={handleDealCards}>Deal cards</button>
            <button onClick={handleGame}>{gameState}</button>
        </>
    );
};

export default Game;
