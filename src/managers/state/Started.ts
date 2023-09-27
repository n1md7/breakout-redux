import { State } from '/src/managers/state/State';
import { sounds } from '/src/constants/sound';
import * as L from 'littlejsengine/build/littlejs.esm';
import { Game } from '/src/game/Game';
import { Brick } from '/src/components/brick/Brick';
import { emitter } from '/src/utils/Emitter';
import { Bonus } from '/src/components/Bonus';
import { bonusLevelCounter, setBonusLevelCounter } from '/src/ui/store';

export class Started extends State {
  private timer: NodeJS.Timeout | null = null;

  constructor(game: Game) {
    super(game);

    this.onBonusCollected = this.onBonusCollected.bind(this);
    this.onBrickDestroyed = this.onBrickDestroyed.bind(this);
  }

  override async attach() {
    await super.attach();

    this.game.mode.reApply();
    this.startCountdown();

    this.game.bonus.resume();
    this.game.balls.resume();

    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);

    if (!this.game.balls.hasValue() && this.game.lives.hasValue()) {
      sounds.gameStart.play();
      this.game.balls.spawnOneAt(L.cameraPos); // Center of the screen
    }
  }

  override async detach() {
    this.game.bonus.stop();
    this.game.balls.stop();
    this.game.mode.clearTimers();
    this.stopCountdown();

    emitter.off('bonusCollected', this.onBonusCollected);
    emitter.off('brickDestroyed', this.onBrickDestroyed);

    await super.detach();
  }

  override async update(dt: number) {
    this.game.balls.update();

    await this.evaluateBonusModeEnd();

    if (this.game.balls.escaped()) {
      if (this.game.mode.isBonus()) {
        // One chance for the bonus mode
        return await this.game.state.changeTo('stageWinDialog');
      }

      sounds.gameLose.play();

      this.game.balls.destroy();
      this.game.lives.decrement();
      if (this.game.lives.runOut()) {
        return await this.game.state.changeTo('extraLifeDialog');
      }
      // Fallback to idle state. "Click to start" screen
      return await this.game.state.changeTo('idle');
    }

    if (this.game.stage.isCleared()) {
      return await this.game.state.changeTo('stageWinDialog');
    }
  }

  private onBonusCollected(bonus: Bonus) {
    this.game.bonus.collect(bonus);
  }

  private onBrickDestroyed(brick: Brick) {
    this.game.score.add(brick.score);
    // Only count breakable bricks
    if (brick.isBreakable) this.game.bricks.destroyed.increment();
    // No bonuses in classic mode
    if (this.game.mode.isClassic()) return;

    // Every 3rd brick destroyed, spawn a bonus
    if (this.game.score.toValue() % 3 === 0) {
      this.game.bonus.produce(this.game.mode.pickBonusType());
    }
  }

  private async evaluateBonusModeEnd() {
    if (this.game.mode.modeIsBonus()) {
      if (bonusLevelCounter() <= 0) {
        await this.game.state.changeTo('stageWinDialog');
      }
    }
  }

  private startCountdown() {
    if (!this.game.mode.modeIsBonus()) return;
    this.timer = setInterval(() => {
      setBonusLevelCounter((prev) => prev - 1);
    }, 1000);
  }

  private stopCountdown() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
