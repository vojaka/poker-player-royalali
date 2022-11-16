import {Card} from "./interface/Card";

export class Evaluator {

    public evaluate(cards_in_hand: Card[]): number {
        if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
            return 1
        }
        return Math.random()
    }

}