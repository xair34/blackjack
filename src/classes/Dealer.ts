import { GameStates } from "../components/game/Game";
import { Participant } from "./Participant";

export class Dealer extends Participant {
    constructor() {
        super();
    }
    shouldHit(): boolean {
        return this.getHandValue() as number < 21;
    }

    getHandValue(gameState?: GameStates): number | string {
        if (this.hand.length == 0) {
            return 'No cards in hand yet';
        }
        let sum = 0;
        let aceCount = 0;
        if (gameState == 'start' || gameState == 'playerTurns') {
            if (this.hand[0].value === 'king' || this.hand[0].value === 'queen' || this.hand[0].value === 'jack') {
                sum += 10;
            } else if (this.hand[0].value === 'ace') {
                aceCount += 1;
            } else {
                sum += parseInt(this.hand[0].value);
            }
            for (let i = 0; i < aceCount; i++) {
                if (sum + 11 <= 21 - (aceCount - 1 - i)) {
                    sum += 11;
                } else {
                    sum += 1;
                }
            }
        }
        else {

            for (const card of this.hand) {
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
        }
        return sum;
    }
}