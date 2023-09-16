import { Game } from '/src/Game';

export abstract class Bonus {
  protected readonly timeout = 10_000;
  protected constructor(public readonly game: Game) {}

  abstract apply(): void;
}
