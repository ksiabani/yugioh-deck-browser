import { Selector, State, Action, StateContext, NgxsOnInit } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Card } from "../models/deck.model";
import { DataService } from "../services/data.service";
import { ApiResponse } from "../models/api-response.model";
import { cardNames } from "../data/card-names";
import { GetCards, SetCardName } from "./deck.actions";
import { GetCardImage } from "./deck.actions";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

export interface DeckStateModel {
  cards: Card[];
  cardName: string;
  imageData: SafeUrl;
  value: number;
  loading: boolean;
}

@State<DeckStateModel>({
  name: "deck",
  defaults: { cards: [], cardName: "", imageData: "", value: 0, loading: false }
})
export class DeckState implements NgxsOnInit {
  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  @Selector()
  static cards(state: DeckStateModel): Card[] {
    return state.cards;
  }

  @Selector()
  static cardName(state: DeckStateModel): string {
    return state.cardName;
  }

  @Selector()
  static imageData(state: DeckStateModel): SafeUrl {
    return state.imageData;
  }

  @Selector()
  static loading(state: DeckStateModel): boolean {
    return state.loading;
  }

  ngxsOnInit(ctx: StateContext<DeckStateModel>) {
    const cardName: string = cardNames[0];
    ctx.dispatch([
      new GetCards(),
      new GetCardImage(cardName),
      new SetCardName(cardName)
    ]);
  }

  @Action(GetCards)
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

  @Action(GetCardImage)
  getCardImage(ctx: StateContext<DeckStateModel>, { cardName }: GetCardImage) {
    ctx.patchState({ loading: true });
    return this.dataService.getCardImage(cardName).pipe(
      tap((data: Blob) => {
        const imageData = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(data)
        );
        ctx.patchState({ imageData });
        ctx.patchState({ loading: false });
      })
    );
  }

  @Action(SetCardName)
  setCardName(ctx: StateContext<DeckStateModel>, { cardName }: SetCardName) {
    ctx.patchState({ cardName });
  }
}
