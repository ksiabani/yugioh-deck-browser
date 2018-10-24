import { Injectable } from "@angular/core";

export interface Card {
  name: string;
}

export const cards: Card[] = [
  { name: "Burial from a Different Dimension" },
  { name: "Charge of the Light Brigade" },
  { name: "Infernoid Antra" },
  { name: "Infernoid Attondel" },
  { name: "Infernoid Decatron" },
  { name: "Infernoid Devyaty" },
  { name: "Infernoid Harmadik" },
  { name: "Infernoid Onuncu" },
  { name: "Infernoid Patrulea" },
  { name: "Infernoid Pirmais" },
  { name: "Infernoid Seitsemas" },
  { name: "Lyla, Lightsworn Sorceress" },
  { name: "Monster Gate" },
  { name: "One for One" },
  { name: "Raiden, Hand of the Lightsworn" },
  { name: "Reasoning" },
  { name: "Time-Space Trap Hole" },
  { name: "Torrential Tribute" },
  { name: "Upstart Goblin" },
  { name: "Void Seer" }
];

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}
}
