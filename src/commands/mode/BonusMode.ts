import { Mode } from '/src/commands/mode/Mode';
import { Game } from '/src/Game';
import * as TWEEN from '@tweenjs/tween.js';
import { LinkedList } from '/src/data-structures/LinkedList';
import L from 'littlejsengine/build/littlejs.esm';
import { BonusType } from '/src/enums/bonus';

export class BonusMode extends Mode {
  private readonly timeout = 3_000;
  private readonly tweens: LinkedList<TWEEN.Tween<L.Vector2>> = new LinkedList();

  constructor(game: Game) {
    super(game);

    this.bonusPicker.setProbabilities([
      [BonusType.DoubleBalls, 0.2],
      [BonusType.TripleBalls, 0.2],
      [BonusType.ExtraBalls, 0.2],
      [BonusType.ExtraScore, 0.2],
      [BonusType.ExtraWall, 0.2],
    ]);
  }

  apply(): void {
    console.info('Bonus mode activated');
    this.game.balls.setStrength(9); // Max strength

    this.timers.push(
      setInterval(() => {
        for (const brick of this.game.bricks) {
          const tween = new TWEEN.Tween(brick.pos);
          tween.to({ y: brick.pos.y - 1 }, 500);
          tween.easing(TWEEN.Easing.Back.InOut);
          tween.start();
          this.tweens.add(tween);
        }
      }, this.timeout),
    );
  }

  override update() {
    for (const tween of this.tweens) {
      tween.update();
    }
  }
}
