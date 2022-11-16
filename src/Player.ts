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
    switch(action) {
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

  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    const evaluator = new Evaluator();
    const random = Math.random();
    const currentBetAmount = gameState.players[gameState.in_action]["bet"];
    let action = Actions.FOLD;
    if (evaluator.evaluate(gameState.players[gameState.in_action].hole_cards) === 1) {
      action = Actions.CALL;
    } else if (currentBetAmount === 0) { // We don't have small or big blind
      if (random > 0.9) {
        action = Actions.CALL;
      }
    }

    betCallback(this.calculateAction(action, gameState));
  }

  public showdown(gameState: GameState): void {

  }
};

export default Player;
