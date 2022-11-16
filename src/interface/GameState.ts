import { Player } from "./Player";
import { Card } from "./Card";

export interface GameState {
    bet_index: number
    current_buy_in: number
    in_action: number
    community_cards: Card[]
    dealer: number
    game_id: string
    orbits: number
    players: Player[]
    pot: number
    round: number
    small_blind: number
    tournament_id: string
}