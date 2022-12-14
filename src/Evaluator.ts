import { Card } from "./interface/Card";
import { RankingsResponse } from "./interface/RankingResponse";
export class Evaluator {

    public evaluate(cards_in_hand: Card[]): number {
        if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
            return 1
        }
        return Math.random()
    }

    public evaluate_hand(cards_in_hand: Card[], cards_on_table?: Card[]): number | false {
        let rankings: any;
        const cards: Card[] = [...cards_in_hand, ...cards_on_table!]
        try {
            this.getHandRank(cards).then(response =>
                rankings = response)
        } catch (e) {
            console.warn(e)
        }

        console.log("Rankings response:", rankings)
        return rankings ? this.getHandValue(rankings) : false;
    }

    public getHandValue(ranking: RankingsResponse): number {
        return 0.8 * ranking.rank + 0.1 * ranking.value + 0.1 * ranking.second_value
    }

    public getHandRank(cards: Card[]) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const reqUrl = 'http://rainman.leanpoker.org/rank?cards=[' + cards.map((elem) => JSON.stringify(elem)) + ']';
        console.log(reqUrl)
        return fetch(reqUrl, requestOptions)
            .then((response) => {
                console.log("RESPONSE FROM API:", response, typeof response)
                return response.text();
            })
            .then((responseData) => {
                return JSON.parse(responseData)
            }).catch(error => console.warn(error))
    }
}
