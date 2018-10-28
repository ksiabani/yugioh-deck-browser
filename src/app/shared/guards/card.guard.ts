import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { DeckState } from "../store/deck.state";
import { cardNames } from "../data/card-names";

@Injectable({
  providedIn: "root"
})
export class CardGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const cardId = next.params.cardId;
    const cardName = this.store.selectSnapshot(DeckState.cardName);
    if (!cardId) {
      this.router.navigate(["/cards", cardName]);
    }
    if (cardId && !cardNames.includes(cardId)) {
      this.router.navigate(["/404"]);
    }
    return true;
  }
}
