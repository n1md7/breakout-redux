import { Game } from '/src/Game';
import { GameMode } from '/src/enums/mode';
import { DynamicMode } from '/src/commands/mode/DynamicMode';
import { Mode } from '/src/commands/mode/Mode';
import { ClassicMode } from '/src/commands/mode/ClassicMode';
import { BonusMode } from '/src/commands/mode/BonusMode';
import { ModernMode } from '/src/commands/mode/ModernMode';

export class ModeCommand {
  private readonly modes: Record<GameMode, Mode>;
  private currentMode: Mode;

  constructor(game: Game) {
    this.modes = {
      [GameMode.Dynamic]: new DynamicMode(game),
      [GameMode.Classic]: new ClassicMode(game),
      [GameMode.Bonus]: new BonusMode(game),
      [GameMode.Modern]: new ModernMode(game),
    };
    this.currentMode = this.modes[GameMode.Classic];
  }

  execute(mode: GameMode) {
    this.clearTimers();
    this.currentMode = this.modes[mode];
    this.currentMode.apply();
  }

  update() {
    this.currentMode.update();
  }

  setDefault() {
    this.execute(GameMode.Dynamic);
  }

  modeIsDynamic() {
    return this.currentMode instanceof DynamicMode;
  }

  modeIsClassic() {
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
