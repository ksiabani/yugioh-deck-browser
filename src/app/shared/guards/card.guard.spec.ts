import { TestBed, async, inject } from "@angular/core/testing";
import { CardGuard } from "./card.guard";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";

describe("CardGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardGuard,
        { provide: Router, useValue: { navigate: () => null } },
        { provide: Store, useValue: {} }
      ]
    });
  });

  it("should ...", inject([CardGuard], (guard: CardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
