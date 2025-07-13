import { Card } from "../types/card";

export class Participant {
    private _hand: Card[] = [];
    private _handValue: number = 0;
    private _softAces: number = 0;

    get handValue(): number {
        return this._handValue;
    }

    get hand(): Card[] {
        return this._hand;
    }

    public addCard(card: Card): void {
        this._hand.push(card);

        if (['king', 'queen', 'jack'].includes(card.value)) {
            this._handValue += 10;
        } else if (card.value === 'ace') {
            this._handValue += 11;
            this._softAces += 1;
        } else {
            this._handValue += parseInt(card.value);
        }

        while (this._handValue > 21 && this._softAces > 0) {
            this._handValue -= 10;
            this._softAces -= 1;
        }
    }
    public resetHand(): void {
        this._hand = [];
        this._handValue = 0;
        this._softAces = 0;
    }
    public hasBlackJack(): boolean {
        return this._handValue === 21 && this._hand.length === 2;
    }
    public isBusted(): boolean {
        return this._handValue > 21;
    }

}