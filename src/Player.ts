import { Evaluator } from "./Evaluator";
import { GameState } from "./interface/GameState";

export class Player {
    public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {

    const fold = 0;
    const call = gameState.current_buy_in - gameState.players[gameState.in_action]["bet"];

    const evaluator = new Evaluator();
    let action = fold;
    if (evaluator.evaluate(gameState.players[gameState.in_action].hole_cards) > 0.9) {
      action = call;
    }

    betCallback(action);
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
