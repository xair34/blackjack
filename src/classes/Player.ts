import { Card } from "../types/card";
import { Participant } from "./Participant";

export class Player extends Participant{
    private _hands!: Map<number, Card[]>;
    
    private _balance!: number;
    public currentBet: number = 0;

    constructor(balance: number){
        super();
        this._balance = balance;
    }
    public canHit(): boolean{
        return this.getHandValue() as number < 21;
    }
    public placeBet(betAmount: number): boolean{
        return betAmount >= this._balance;
    }

    public canSplitHand(hand: Card[]): boolean{
        return super.hand.length == 2 && hand[0].value == hand[1].value;
    }

    public splitHand(hand: Card[]): void{
        this._hands.set(this._hands.size, hand);
    }

    public win(amount: number): void{
        this._balance += amount;
    }
    public lose(amount: number): void{
        this._balance -= amount;
    }
}