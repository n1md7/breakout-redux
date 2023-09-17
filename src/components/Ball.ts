import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/Brick';
import { Sounds } from '/src/constants/sound';
import { Particles } from '/src/constants/particle';
import { Paddle } from '/src/components/Paddle';
import { emitter } from '/src/utils/Emitter';
import { Strength } from '/src/components/utils/Strength';

export class Ball extends L.EngineObject {
  readonly strength: Strength;

  constructor(position: L.Vector2, strength = 1) {
    super(position, L.vec2(0.25));

    this.strength = new Strength(strength);
    const sign = L.randInt(0, 2) === 0 ? -1 : 1;
    this.velocity = L.vec2(0.1 * sign, -0.1);
    this.setCollision(true);
    this.elasticity = 1;
  }

  override collideWithObject(object: L.EngineObject): boolean {
    const isBrick = object instanceof Brick;
    const isPaddle = object instanceof Paddle;

    if (isBrick) return this.handleBrickCollision(object);
    if (isPaddle) return this.handlePaddleCollision(object);

    return true; // Single hit and bounce off
  }

  override update() {
    this.angleVelocity = this.velocity.length() * 10;
    this.color = this.strength.getColor();
    return super.update();
  }

  private handleBrickCollision(brick: Brick) {
    this.strength.sub(brick.getStrength());
    const { color } = brick; // Copy the color of the brick, down below it changes
    // this.color = color; // Change the color of the ball to the color of the brick
    Sounds.BrickHit.play(this.pos);
    console.info('Brick hit', brick.getStrength(), this.strength.getValue());
    brick.increaseHitCount();
    if (brick.shallBeDestroyed()) {
      Particles.BallDestroy(this.pos, color);
      Sounds.BrickDestroy.play(this.pos);
      emitter.emit('brickDestroyed', brick);
      brick.destroy();
    } else {
      Particles.BrickHit(this.pos, color);
    }
    // It will not bounce off but will destroy more bricks as it goes through
    if (this.strength.hasValue()) return false;

    // Default bounce off
    return true;
  }

  private handlePaddleCollision(paddle: Paddle) {
    this.strength.restore(); // Only paddle touch can restore the strength
    // Accelerate the sound based on the velocity
    const pitch = this.velocity.length() + 0.5;
    Sounds.BallBounce.play(this.pos, 1, pitch);

    const deltaX = this.pos.x - paddle.pos.x;
    this.velocity = this.velocity.rotate(deltaX * 0.3);
    this.velocity.y = L.max(this.velocity.y, 0.3);

    const speed = L.min(1.04 * this.velocity.length(), 0.5);
    this.velocity = this.velocity.normalize().scale(speed);

    return false; // We did a custom bounce calculations, avoid the default bounce
  }
}
