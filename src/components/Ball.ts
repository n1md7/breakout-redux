import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/Brick';
import { Score } from '/src/ui/Score';
import { Sounds } from '/src/constants/sound';
import { Particles } from '/src/constants/particle';
import { Paddle } from '/src/components/Paddle';

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

  override collideWithObject(object: L.EngineObject): boolean {
    if (object instanceof Brick) {
      const { color } = object;
      Sounds.BrickHit.play(this.pos);
      object.increaseHitCount();
      if (object.shallBeDestroyed()) {
        Particles.BallDestroy(this.pos, color);
        Sounds.BrickDestroy.play(this.pos);
        this.score.add(object.score);
        object.destroy();
      } else {
        Particles.BrickHit(this.pos, color);
      }
    } else {
      // Accelerate the sound based on the velocity
      const pitch = this.velocity.length() + 0.5;
      Sounds.BallBounce.play(this.pos, 1, pitch);
    }

    if (object instanceof Paddle) {
      const deltaX = this.pos.x - object.pos.x;
      this.velocity = this.velocity.rotate(deltaX * 0.3);
      this.velocity.y = L.max(this.velocity.y, 0.3);

      const speed = L.min(1.04 * this.velocity.length(), 0.5);
      this.velocity = this.velocity.normalize().scale(speed);

      return false; // We did a custom bounce, avoid the default bounce
    }

    return true; // Single hit and bounce off
  }
}
