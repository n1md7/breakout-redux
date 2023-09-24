import { Mode } from '/src/managers/mode/Mode';
import * as TWEEN from '@tweenjs/tween.js';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LinkedList } from '/src/data-structures/LinkedList';
import { Game } from '/src/game/Game';
import { BonusType } from '/src/enums/bonus';

export class DynamicMode extends Mode {
  public readonly displayName = 'Dynamic';
  private readonly timeout = 10_000;
  private readonly tweens: LinkedList<TWEEN.Tween<L.Vector2>> = new LinkedList();

  constructor(game: Game) {
    super(game);

    this.bonusPicker.setProbabilities([
      [BonusType.ExtraScore, 20],
      [BonusType.ExtraStrength, 20],
      [BonusType.PaddleIncrease, 20],
      [BonusType.PaddleDecrease, 40],
    ]);
  }

  apply(): void {
    console.info('Dynamic mode activated');
    this.tweens.clear();
    this.timers.push(
      setInterval(() => {
        if (!this.game.state.isStarted) return;

        for (const brick of this.game.bricks) {
          const tween = new TWEEN.Tween(brick.pos);
          tween.to({ y: brick.pos.y - 1 }, 500);
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
