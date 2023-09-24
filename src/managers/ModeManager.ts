import { Game } from '/src/game/Game';
import { GameMode } from '/src/enums/mode';
import { DynamicMode } from '/src/managers/mode/DynamicMode';
import { Mode } from '/src/managers/mode/Mode';
import { ClassicMode } from '/src/managers/mode/ClassicMode';
import { BonusMode } from '/src/managers/mode/BonusMode';
import { ModernMode } from '/src/managers/mode/ModernMode';
import { EmptyMode } from '/src/managers/mode/EmptyMode';

export class ModeManager {
  private readonly modes: Record<GameMode, Mode>;
  private currentMode: Mode;

  constructor(game: Game) {
    this.modes = {
      [GameMode.Empty]: new EmptyMode(game),
      [GameMode.Dynamic]: new DynamicMode(game),
      [GameMode.Classic]: new ClassicMode(game),
      [GameMode.Bonus]: new BonusMode(game),
      [GameMode.Modern]: new ModernMode(game),
    };
    this.currentMode = this.modes[GameMode.Empty];
  }

  toString() {
    return this.currentMode.displayName;
  }

  execute(mode: GameMode) {
    this.clearTimers();
    this.currentMode = this.modes[mode];
    this.currentMode.apply();
  }

  async update() {
    await this.currentMode.update();
  }

  setDefault() {
    this.execute(GameMode.Dynamic);
  }

  modeIsDynamic() {
    return this.currentMode instanceof DynamicMode;
  }

  isClassic() {
    return this.currentMode instanceof ClassicMode;
  }

  modeIsBonus() {
    return this.currentMode instanceof BonusMode;
  }

  modeIsModern() {
    return this.currentMode instanceof ModernMode;
  }

  pickBonusType() {
    return this.currentMode.pickBonus();
  }

  clearTimers() {
    this.currentMode.clearTimers();
  }
}
