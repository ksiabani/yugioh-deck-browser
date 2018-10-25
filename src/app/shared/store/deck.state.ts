import { Selector, State, Action, StateContext, Store } from "@ngxs/store";
import * as actions from "./deck.actions";
import { tap } from "rxjs/operators";
import { Card } from "../models/deck.model";
import { DataService } from "../services/data.service";
import { ApiResponse } from "../models/api-response.model";

export interface DeckStateModel {
  cards: Card[];
  value: number;
  loading: boolean;
}

@State<DeckStateModel>({
  name: "deck",
  defaults: { cards: [], value: 0, loading: false }
})
export class DeckState {
  constructor(private dataService: DataService, private store: Store) {}

  @Selector()
  static cards(state: DeckStateModel): Card[] {
    return state.cards;
  }

  @Action(actions.GetCards)
  getCards(ctx: StateContext<DeckStateModel>) {
    ctx.patchState({ loading: true });
    return this.dataService.getCards().pipe(
      tap((response: ApiResponse[]) => {
        const cards = response.map(res => res.data);
        ctx.patchState({ cards });
        ctx.patchState({ loading: false });
      })
    );
  }
}
