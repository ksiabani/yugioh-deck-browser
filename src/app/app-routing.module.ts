import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { CardGuard } from "./shared/guards/card.guard";
import { CardsComponent } from "./cards/cards.component";
import { LayoutComponent } from "./layout/layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [CardGuard],
    component: LayoutComponent
  },
  {
    path: "cards",
    canActivate: [CardGuard],
    component: CardsComponent
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
