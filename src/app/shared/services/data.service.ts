import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Card } from "../models/deck.model";
import { forkJoin, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { cardNames } from "../card-names";

@Injectable({
  providedIn: "root"
})
export class DataService {
  cardNames: Observable<string[]> = of(cardNames);

  constructor(private http: HttpClient) {}

  getCards() {
    return this.cardNames.pipe(
      mergeMap(q =>
        forkJoin(
          ...q.map(cardName =>
            this.http.get<Card>(`${environment.api}/card_data/${cardName}`)
          )
        )
      )
    );
  }
}
