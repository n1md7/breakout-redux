import { Mode } from '/src/managers/mode/Mode';
import { Game } from '/src/game/Game';
import * as TWEEN from '@tweenjs/tween.js';
import { LinkedList } from '/src/data-structures/LinkedList';
import L from 'littlejsengine/build/littlejs.esm';
import { BonusType } from '/src/enums/bonus';
import { setBonusLevelCounter } from '/src/ui/store';

export class BonusMode extends Mode {
  public readonly displayName = 'Bonus';
  private readonly timeout = 3_000;
  private readonly tweens: LinkedList<TWEEN.Tween<L.Vector2>> = new LinkedList();

  constructor(game: Game) {
    super(game);

    this.bonusPicker.setProbabilities([
      [BonusType.DoubleBalls, 10],
      [BonusType.TripleBalls, 10],
      [BonusType.ExtraBalls, 30],
      [BonusType.ExtraScore, 30],
      [BonusType.ExtraWall, 20],
    ]);
  }

  apply(): void {
    console.info('Bonus mode activated');
    setBonusLevelCounter(30); // 30 seconds to finish the level
    this.game.balls.setStrength(9); // Max strength
    this.tweens.clear();
    this.clearTimers();
    this.timers.push(
      setInterval(() => {
        if (!this.game.state.isStarted) return;

        for (const brick of this.game.bricks) {
          const tween = new TWEEN.Tween(brick.pos);
          tween.to({ y: brick.pos.y - 1 }, 900);
          tween.easing(TWEEN.Easing.Bounce.Out);
          tween.start();
          this.tweens.add(tween);
        }
      }, this.timeout),
    );
  }

  override async update() {
    await super.update();
    for (const tween of this.tweens) {
      tween.update();
    }
  }
}
