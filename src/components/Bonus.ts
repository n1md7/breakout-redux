import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors } from '/src/constants/color';
import { Paddle } from '/src/components/Paddle';
import { emitter } from '/src/utils/Emitter';
import { BonusType } from '/src/enums/bonus';

export class Bonus extends L.EngineObject {
  private readonly type: BonusType;
  private readonly sign: number = 1;

  private stopped = false;
  private oldVelocity: L.Vector2 = L.vec2(0);

  constructor(position: L.Vector2, type: BonusType) {
    super(position, L.vec2(0.5));

    this.type = type;
    this.setCollision(true);
    this.velocity = L.vec2(0, -0.1);

    this.color = Colors[this.type];
    this.sign = L.randInt(0, 1) === 0 ? -1 : 1;
  }

  getType() {
    return this.type;
  }

  override update() {
    if (this.stopped) return;

    this.angle += this.sign * 0.3;

    if (this.pos.y < 0) {
      // Bonus lost
      this.destroy();
    }

    super.update();
  }

  override collideWithObject(object: L.EngineObject): boolean {
    if (object instanceof Paddle) {
      emitter.emit('bonusCollected', this);
      this.destroy();
    }

    // No collision with anything
    return false;
  }

  public stopMovement() {
    this.stopped = true;
    this.oldVelocity = this.velocity;
    this.velocity = L.vec2(0);
  }

  public resumeMovement() {
    this.stopped = false;
    this.velocity = this.oldVelocity;
  }
}
