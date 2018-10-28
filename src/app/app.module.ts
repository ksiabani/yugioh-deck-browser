import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { LayoutComponent } from "./layout/layout.component";
import { CardsComponent } from "./cards/cards.component";
import { CardComponent } from "./card/card.component";
import { DeckState } from "./shared/store/deck.state";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CardsComponent,
    CardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    NgxsModule.forRoot([DeckState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    PerfectScrollbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
