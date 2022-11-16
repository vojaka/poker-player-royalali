import {Card} from "./interface/Card";
export class Evaluator {

    public evaluate(cards_in_hand: Card[]): number {
        if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
            return 1
        }
        let rankings: any;
        this.getHandRank(cards_in_hand).then(response =>
            rankings = response)
        console.log(rankings)
        console.log(this.getHandValue(rankings))
        return Math.random()
    }

    public getHandValue(ranking: any): number {
        return 0.8 * ranking.rank + 0.1 * ranking.first_value + 0.1 * ranking.second_value
    }

    public getHandRank(cards: Card[]): any {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cards)
        };
        return fetch('http://rainman.leanpoker.org/rank', requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                return responseData
            }).catch(error => console.warn(error))
    }
}
