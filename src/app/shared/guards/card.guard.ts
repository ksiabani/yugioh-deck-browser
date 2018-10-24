import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { cards } from "../services/data.service";

@Injectable({
  providedIn: "root"
})
export class CardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const cardId = next.params.cardId;
    if (!cardId) {
      this.router.navigate(['/cards', cards[0].name]);
    }
    return true;
  }
}
