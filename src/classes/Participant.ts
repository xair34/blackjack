import { Card } from "../types/card";

export class Participant {
    private _hand: Card[] = [];

    get hand(): Card[] {
        return this._hand;
    }

    public addCard(card: Card): void {
        this._hand.push(card);
    }
    public resetHand(): void {
        this._hand = [];
    }
    public getHandValue(): number | string {
        if (this._hand.length == 0) {
            return 'No cards in hand yet';
        }
        let sum = 0;
        let aceCount = 0;
        for (const card of this._hand) {
            if (card.value === 'king' || card.value === 'queen' || card.value === 'jack') {
                sum += 10;
            } else if (card.value === 'ace') {
                aceCount += 1;
            } else {
                sum += parseInt(card.value);
            }
        }
        for (let i = 0; i < aceCount; i++) {
            if (sum + 11 <= 21 - (aceCount - 1 - i)) {
                sum += 11;
            } else {
                sum += 1;
            }
        }
        return sum;
    }
    public hasBlackJack(): boolean {
        return this.getHandValue() == 21;
    }
    public isBusted(): boolean {
        return typeof this.getHandValue() === 'number' && this.getHandValue() as number > 21;
    }

}