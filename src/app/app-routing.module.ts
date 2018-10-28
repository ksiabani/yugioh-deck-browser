import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { CardGuard } from "./shared/guards/card.guard";
import { CardsComponent } from "./cards/cards.component";
import { LayoutComponent } from "./layout/layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

// Set routes and pass them through card guard
const routes: Routes = [
  {
    path: "",
    canActivate: [CardGuard],
    component: LayoutComponent // never gets here, but Angular needs one
  },
  {
    path: "cards",
    canActivate: [CardGuard],
    component: CardsComponent // never gets here, but Angular needs one
  },
  {
    path: "cards/:cardId",
    canActivate: [CardGuard],
    component: CardComponent
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
