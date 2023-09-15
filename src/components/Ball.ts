import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/Brick';
import { Score } from '/src/ui/Score';

export class Ball extends L.EngineObject {
  private readonly score: Score;
  constructor(position: L.Vector2, score: Score) {
    super(position, L.vec2(0.5));

    this.score = score;
    this.velocity = L.vec2(-0.1, -0.1);
    this.setCollision(true);
    // this.mass = 0.1;
    this.elasticity = 1;
  }

  override collideWithObject(target: L.EngineObject): boolean {
    if (target instanceof Brick) {
      target.increaseHitCount();
      if (target.evaluateAndDestroy()) {
        this.score.add(target.score);
      }
    }

    return true; // Single hit and bounce off
  }
}
