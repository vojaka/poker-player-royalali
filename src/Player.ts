import { Evaluator } from "./Evaluator";
import { GameState } from "./interface/GameState";

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {

    const fold = 0;
    const currentBetAmount = gameState.players[gameState.in_action]["bet"];
    const call = gameState.current_buy_in - currentBetAmount;
    const evaluator = new Evaluator();
    const random = Math.random();

    let action = fold;
    if (evaluator.evaluate(gameState.players[gameState.in_action].hole_cards) === 1) {
      action = call;
    } else if (currentBetAmount === 0) { // We don't have small or big blind
      if (random > 0.9) {
        action = call;
      }
    }

    betCallback(action);
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
