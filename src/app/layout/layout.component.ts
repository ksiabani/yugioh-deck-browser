import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { Select } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  isMobile: Observable<boolean> = this.breakpointObserver
    .observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ])
    .pipe(map(result => result.matches));
  @Select(DeckState.cardName)
  cardName: Observable<string>;
  @ViewChild("sidenav")
  sidenav: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
  }

  closeSidenav() {
    if (this.breakpointObserver.isMatched('(max-width: 959px)')) {
      this.sidenav.close();
    }
  }
}
