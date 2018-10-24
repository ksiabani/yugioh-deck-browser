import { Card } from './deck.model';

export interface ApiResponse {
  status: string;
  data: Card;
}