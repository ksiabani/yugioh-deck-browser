import { Selector, State, Action, StateContext, NgxsOnInit } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Card } from "../models/deck.model";
import { DataService } from "../services/data.service";
import { ApiResponse } from "../models/api-response.model";
import { cardNames } from "../data/card-names";
import { GetCards, SetCard, SetCardName } from "./deck.actions";
import { GetCardImage } from "./deck.actions";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

export interface DeckStateModel {
  cards: Card[];
  card: Card;
  cardName: string;
  imageData: SafeUrl;
  value: number;
  loading: boolean;
}

// Define state and set defaults
@State<DeckStateModel>({
  name: "deck",
  defaults: {
    cards: [],
    card: null,
    cardName: "",
    imageData: "",
    value: 0,
    loading: false
  }
})
export class DeckState implements NgxsOnInit {
  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  // Create selectors
  @Selector()
  static cards(state: DeckStateModel): Card[] {
    return state.cards;
  }

  @Selector()
  static card(state: DeckStateModel): Card {
    return state.card;
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

  // Run certain actions when initializing state
  ngxsOnInit(ctx: StateContext<DeckStateModel>) {
    const cardName: string = cardNames[0];
    ctx.dispatch([
      new GetCards(),
      new SetCardName(cardName)
    ]);
  }

  // Get cards form data service and load them to state
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

  // Load a card into state
  @Action(SetCard)
  setCard(ctx: StateContext<DeckStateModel>, { card }: SetCard) {
    ctx.patchState({ card });
  }

  // Return image as a blob from data service
  // Return a safe URL from it and load it in state
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

  // Load current's card name to state
  @Action(SetCardName)
  setCardName(ctx: StateContext<DeckStateModel>, { cardName }: SetCardName) {
    ctx.patchState({ cardName });
  }
}
