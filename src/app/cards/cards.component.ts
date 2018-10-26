import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { Observable } from "rxjs";
import { Card } from "../shared/models/deck.model";
import {
  GetCardImage,
  SetCard,
  SetCardName
} from "../shared/store/deck.actions";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.scss"]
})
export class CardsComponent implements OnInit {
  @Select(DeckState.cards)
  cards: Observable<Card[]>;
  constructor(private store: Store) {}

  ngOnInit() {}

  getCardDetails(cardName) {
    this.cards.pipe(filter(cards => !!cards)).subscribe(cards => {
      const selectedCard = cards.find(card => card.name === cardName);
      this.store.dispatch([
        new SetCardName(cardName),
        new GetCardImage(cardName),
        new SetCard(selectedCard)
      ]);
    });
  }
}
