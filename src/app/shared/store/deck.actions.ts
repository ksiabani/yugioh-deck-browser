export class GetCards {
  static readonly type = "[Deck] Get cards";
}

export class GetCardImage {
  static readonly type = "[Deck] Get card's image";
  constructor(public cardName: string) {}
}

export class SetCardName {
  static readonly type = "[Deck] Set card name";
  constructor(public cardName: string) {}
}
