import { Card } from "./Card";

export interface Player {
    id:          number;
    name:        string;
    status:      string;
    version:     string;
    stack:       number;
    bet:         number;
    hole_cards?: Card[];
}