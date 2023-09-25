import { State } from '/src/managers/state/State';
import { Sounds } from '/src/constants/sound';
import * as L from 'littlejsengine/build/littlejs.esm';
import { Game } from '/src/game/Game';
import { BonusType } from '/src/enums/bonus';
import { Brick } from '/src/components/brick/Brick';
import { emitter } from '/src/utils/Emitter';
import { Bonus } from '/src/components/Bonus';

export class Started extends State {
  constructor(game: Game) {
    super(game);

    this.onBonusCollected = this.onBonusCollected.bind(this);
    this.onBrickDestroyed = this.onBrickDestroyed.bind(this);
  }

  override async attach() {
    await super.attach();

    this.game.bonus.resume();
    this.game.balls.resume();

    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);

    if (!this.game.balls.hasValue() && this.game.lives.hasValue()) {
      Sounds.GameStart.play();
      this.game.balls.spawnOneAt(L.cameraPos); // Center of the screen
    }
  }

  override async detach() {
    this.game.bonus.stop();
    this.game.balls.stop();
    this.game.mode.clearTimers();

    emitter.off('bonusCollected', this.onBonusCollected);
    emitter.off('brickDestroyed', this.onBrickDestroyed);

    await super.detach();
  }

  override async update(dt: number) {
    this.game.balls.update();

    if (this.game.balls.escaped()) {
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

    if (this.game.score.toValue() % 1 === 0) {
      this.game.bonus.produce(this.game.mode.pickBonusType());
    }
  }
}
