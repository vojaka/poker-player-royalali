import { Card } from "./interface/Card";
import { RankingsResponse } from "./interface/RankingResponse";
export class Evaluator {

    public evaluate(cards_in_hand: Card[]): number {
        if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
            return 1
        }
        return Math.random()
    }

    public evaluate_hand(cards_in_hand: Card[], cards_on_table?: Card[]): number {
        let rankings: any;
        const cards: Card[] = [...cards_in_hand, ...cards_on_table!]
        this.getHandRank(cards).then(response =>
            rankings = response)
        console.log("Rankings response:", rankings)
        return this.getHandValue(rankings)
    }

    public getHandValue(ranking: RankingsResponse): number {
        return 0.8 * ranking.rank + 0.1 * ranking.value + 0.1 * ranking.second_value
    }

    public getHandRank(cards: Card[]) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("Get Rank with parameters", requestOptions)
        return fetch('http://rainman.leanpoker.org/rank?cards=[' + cards.map((elem) => JSON.stringify(elem)) + ']')
            .then((response) => response.json())
            .then((responseData: RankingsResponse) => {
                return responseData
            }).catch(error => console.warn(error))
    }
}
