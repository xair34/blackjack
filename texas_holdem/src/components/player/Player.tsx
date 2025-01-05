import { useState } from "react";

type PlayerProps = {
    name: string;
    money: number;
    cards?: string[];
};

const Player = ({ name, money, cards = [] }: PlayerProps) => {
    const [currentMoney, setCurrentMoney] = useState(money);

    const handleBetMoney = () => {
        setCurrentMoney(currentMoney - 150);
    };

    return (
        <div>
            <div>Player Name - {name}</div>
            <div>Player Money - {currentMoney}</div>
            <div>Player cards - {cards.join(", ") || "No cards yet"}</div>
            <div>
                <button onClick={handleBetMoney}>Bet money</button>
            </div>
        </div>
    );
};

export default Player;
