import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Select, Store } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { GetCardImage, SetCard } from "../shared/store/deck.actions";
import { Card } from "../shared/models/deck.model";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Select(DeckState.imageData)
  imageData: Observable<SafeUrl>;
  @Select(DeckState.loading)
  loading: Observable<boolean>;
  @Select(DeckState.cards)
  cards: Observable<Card[]>;
  @Select(DeckState.card)
  card: Observable<Card>;


  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.cards.pipe(filter(cards => !!cards)).subscribe(cards => {
      const cardName = this.route.snapshot.params.cardId;
      const selectedCard = cards.find(card => card.name === cardName);
      this.store.dispatch([new GetCardImage(cardName), new SetCard(selectedCard)]);
    });
  }
}
