import { Game } from '/src/game/Game';
import { RandomPicker } from '/src/components/utils/RandomPicker';
import { BonusType } from '/src/enums/bonus';

export abstract class Mode {
  public abstract readonly displayName: string;
  protected readonly bonusPicker: RandomPicker<BonusType> = new RandomPicker();

  protected timers: NodeJS.Timeout[] = [];

  protected constructor(public readonly game: Game) {}

  abstract apply(): void;

  update() {}

  pickBonus() {
    return this.bonusPicker.pick();
  }

  clearTimers() {
    this.timers.forEach(clearTimeout);
  }
}
