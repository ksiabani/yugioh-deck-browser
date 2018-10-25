import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Select } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  isHome: boolean;
  isMobile: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.WebPortrait])
    .pipe(map(result => result.matches));
  @Select(DeckState.cardName)
  cardName: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {}
}
