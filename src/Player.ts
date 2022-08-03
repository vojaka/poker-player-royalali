import { GameState } from './GameState'

export class Player {
  public betRequest(_gameState: GameState, betCallback: (bet: number) => void): void {
    betCallback(0)
  }

  public showdown(_gameState: GameState): void {
    // for implementing learning algorithms only
  }
}

export default Player
