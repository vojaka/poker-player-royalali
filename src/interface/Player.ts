import { Card } from "./Card";

export interface Player {
    name: string
    stack: number
    status: string
    bet: number
    hole_cards: Card[]
    version: string
    id: number
}