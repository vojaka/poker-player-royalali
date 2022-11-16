import { GameState } from "./interface/GameState";

export class Player {
    public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {

    const call = gameState.current_buy_in - gameState.players[gameState.in_action]["bet"];
    betCallback(0);
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
