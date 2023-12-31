import { Game } from '/src/game/Game';
import { GameMode } from '/src/enums/mode';
import { DynamicMode } from '/src/managers/mode/DynamicMode';
import { Mode } from '/src/managers/mode/Mode';
import { ClassicMode } from '/src/managers/mode/ClassicMode';
import { BonusMode } from '/src/managers/mode/BonusMode';
import { ModernMode } from '/src/managers/mode/ModernMode';
import { EmptyMode } from '/src/managers/mode/EmptyMode';
import { setMode } from '/src/ui/store';

export class ModeManager {
  private readonly modes: Record<GameMode, Mode>;
  private currentMode: Mode;
  private previousMode: Mode | null = null;

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
    this.previousMode = this.currentMode;
    this.currentMode = this.modes[mode];
    this.currentMode.apply();
  }

  async update() {
    await this.currentMode.update();
  }

  toggleBonus() {
    if (this.modeIsBonus()) return this.restorePreviousMode();

    this.execute(GameMode.Bonus);
    setMode(GameMode.Bonus);
  }

  private restorePreviousMode() {
    this.clearTimers();
    if (this.previousMode) {
      if (this.previousMode instanceof ClassicMode) setMode(GameMode.Classic);
      else if (this.previousMode instanceof ModernMode) setMode(GameMode.Modern);
      else if (this.previousMode instanceof DynamicMode) setMode(GameMode.Dynamic);
      this.currentMode = this.previousMode;
      this.currentMode.apply();
    }
  }

  setDefault() {
    this.execute(GameMode.Dynamic);
  }

  isDynamic() {
    return this.currentMode instanceof DynamicMode;
  }

  isClassic() {
    return this.currentMode instanceof ClassicMode;
  }

  modeIsBonus() {
    return this.currentMode instanceof BonusMode;
  }

  isModern() {
    return this.currentMode instanceof ModernMode;
  }

  isBonus() {
    return this.currentMode instanceof BonusMode;
  }

  pickBonusType() {
    return this.currentMode.pickBonus();
  }

  clearTimers() {
    this.currentMode.clearTimers();
  }

  reApply() {
    this.currentMode.apply();
  }
}
