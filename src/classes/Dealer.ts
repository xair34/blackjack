import { Participant } from "./Participant";

export class Dealer extends Participant {

    constructor() {
        super();
    }
    shouldHit(): boolean {
        return this.handValue < 21;
    }
}