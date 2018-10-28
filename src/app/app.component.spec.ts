import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import { CardsComponent } from "./cards/cards.component";
import { RouterModule, Routes } from "@angular/router";
import { CardGuard } from "./shared/guards/card.guard";
import { CardComponent } from "./card/card.component";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { APP_BASE_HREF } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { DeckState } from "./shared/store/deck.state";
import { HttpClientModule } from "@angular/common/http";

describe("AppComponent", () => {
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
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LayoutComponent,
        CardsComponent,
        CardComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        RouterModule.forRoot(routes),
        PerfectScrollbarModule,
        NgxsModule.forRoot([DeckState]),
        HttpClientModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Yu-Gi-Oh! Deck Browser'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Yu-Gi-Oh! Deck Browser");
  }));
});
