import { useState } from "react";
import Card from "./Card";

const Deck = () => {
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const [playerCards, setPlayerCards] = useState({
        cardOne: "",
        cardTwo: ""
    });
    const deck = suits.flatMap(cardSuit => cardValues.map(card => `${card} of ${cardSuit}`));
    
    const givePlayerTwoCards = () =>{
        
        const[cardOne, cardTwo, ...remainingDeck] = shuffledDeck;

        setPlayerCards({cardOne, cardTwo});
    }

    return (
        <div>
            <button onClick={givePlayerTwoCards}>Deal Two Cards</button>
            <div>
                Player's Cards:
                <div>{playerCards.cardOne}</div>
                <div>{playerCards.cardTwo}</div>
            </div>
        </div>
    );
};

export default Deck;
