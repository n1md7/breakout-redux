import { Game } from '/src/game/Game';

export abstract class BonusType {
  protected readonly timers: NodeJS.Timeout[] = [];
  protected readonly timeout = 10_000;

  protected constructor(public readonly game: Game) {}

  abstract apply(): void;

  clearTimers() {
    this.timers.forEach(clearTimeout);
  }
}
