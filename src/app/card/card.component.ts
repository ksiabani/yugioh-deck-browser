import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Select } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @Select(DeckState.imageData)
  imageData: Observable<SafeUrl>;
  @Select(DeckState.loading)
  loading: Observable<boolean>;

  constructor() {}

  ngOnInit() {}
}
