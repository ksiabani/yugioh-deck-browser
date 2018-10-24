import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { cardNames } from '../card-names';

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
      this.router.navigate(['/cards', cardNames[0]]);
    }
    return true;
  }
}
