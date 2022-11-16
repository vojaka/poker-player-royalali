import { Evaluator } from "./Evaluator";
import { Card } from "./interface/Card";
import { GameState } from "./interface/GameState";

enum Actions {
  FOLD,
  CALL,
  RAISE,
}

export class Player {
  public hole_cards: Card[] = [];
  public community_cards: Card[] = [];

  calculateAction(action: Actions, gameState: GameState) {
    const currentBetAmount = gameState.players[gameState.in_action]["bet"];
    switch (action) {
      case Actions.FOLD:
        return 0;
      case Actions.CALL:
        return gameState.current_buy_in - currentBetAmount;
      case Actions.RAISE:
        return gameState.current_buy_in - currentBetAmount + gameState.minimum_raise;
      default:
        return 0;
    }
  }

  public checkCommunityCards = (gameState) => {
    // We have a pair for now
    const cards_in_hand = gameState.players[gameState.in_action].hole_cards;
    if (cards_in_hand[0].rank === cards_in_hand[1].rank) {
      const ourRank = cards_in_hand[0].rank;
      const filtered = gameState.community_cards.filter((elem) => {
        return elem.rank === ourRank;
      })
      if (filtered.length > 0) {
        return Actions.RAISE;
      } else {
        return Actions.CALL;
      }
    }
    return Actions.CALL;
    // const allCards = [...gameState.players[gameState.in_action], ...gameState.community_cards];
    // // Check for 3 of a kind
    // allCards.reduce((a, b) => {

    // })
  }

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log('aaaabbb');
    const evaluator = new Evaluator();
    const random = Math.random();
    const currentBetAmount = gameState.players[gameState.in_action]["bet"];

    let action = Actions.FOLD;

    const evaluation = evaluator.evaluate_hand(gameState.players[gameState.in_action].hole_cards, gameState.community_cards)

    if (evaluation > 4) {
      action = Actions.CALL;
    } else {
      action = Actions.FOLD;
    };

    betCallback(this.calculateAction(action, gameState));
  }

  public showdown(gameState: GameState): void {

  }
};

export default Player;
