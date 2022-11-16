import {Card} from "./interface/Card";
import * as express from 'express';
export class Evaluator {
    private app = express();

    public evaluate(cards_in_hand: Card[]): number {
        if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
            return 1
        }
        let rankings: any;
        this.getHandRank(cards_in_hand).then(response =>
            rankings = response)
        console.log(rankings)
        return Math.random()
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
