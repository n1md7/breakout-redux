import { Mode } from '/src/commands/mode/Mode';
import { Game } from '/src/game/Game';
import * as TWEEN from '@tweenjs/tween.js';
import { LinkedList } from '/src/data-structures/LinkedList';
import L from 'littlejsengine/build/littlejs.esm';
import { BonusType } from '/src/enums/bonus';

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
    this.game.balls.setStrength(9); // Max strength

    this.timers.push(
      setInterval(() => {
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

  override update() {
    for (const tween of this.tweens) {
      tween.update();
    }
  }
}