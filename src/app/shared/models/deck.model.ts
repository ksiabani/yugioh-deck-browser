export interface Deck {
  cards: Card[];
  value: number;
}

enum CardType {
  "monster",
  "spell",
  "trap"
}

enum Type {
  "Aqua",
  "Beast",
  "Beast-Warrior",
  "Cyberse",
  "Dinosaur",
  "Divine-Beast",
  "Dragon",
  "Fairy",
  "Fiend",
  "Fish",
  "Insect",
  "Machine",
  "Plant",
  "Psychic",
  "Pyro",
  "Reptile",
  "Rock",
  "Sea Serpent",
  "Spellcaster",
  "Thunder",
  "Warrior",
  "Winged Beast",
  "Wyrm",
  "Zombie"
}

enum Family {
  "Dark",
  "Divine",
  "Earth",
  "Fire",
  "Light",
  "Water",
  "Wind"
}

enum Property {
  "Normal",
  "Continuous",
  "Equip",
  "Field",
  "Quick-play",
  "Ritual",
  "Counter"
}

export interface Card {
  name: string;
  text: string;
  card_type: CardType;
  type?: Type;
  family?: Family;
  atk?: number;
  def?: number;
  level?: number;
  property?: Property;
}
