import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Card } from "../models/deck.model";
import { forkJoin, Observable, of } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { cardNames } from "../data/card-names";

@Injectable({
  providedIn: "root"
})
export class DataService {
  cardNames: Observable<string[]> = of(cardNames);

  constructor(private http: HttpClient) {}

  // Get card data for each card in the card list and return an array of results
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

  // Get card image (this endpoint will return a blob)
  getCardImage(cardName: string): Observable<Blob> {
    return this.http.get(`${environment.api}/card_image/${cardName}`, {
      responseType: "blob"
    });
  }
}
