import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CardsComponent } from "./cards.component";
import { AppComponent } from "../app.component";
import { LayoutComponent } from "../layout/layout.component";
import { CardComponent } from "../card/card.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { DeckState } from "../shared/store/deck.state";
import { HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { CardGuard } from "../shared/guards/card.guard";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe("CardsComponent", () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
