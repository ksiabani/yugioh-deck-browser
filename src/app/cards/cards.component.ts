import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { Observable } from "rxjs";
import { Card } from "../shared/models/deck.model";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Select(DeckState.cards)
  cards: Observable<Card[]>;
  constructor() { }

  ngOnInit() {
  }

}
