import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors, Tiles } from '/src/constants/color';
import { Paddle } from '/src/components/Paddle';
import { emitter } from '/src/utils/Emitter';
import { BonusType } from '/src/enums/bonus';

export class Bonus extends L.EngineObject {
  private readonly type: BonusType;

  constructor(position: L.Vector2, type: BonusType) {
    super(position, L.vec2(0.5));

    this.type = type;
    this.setCollision(true);
    this.velocity = L.vec2(0, -0.1);
  }

  override update() {
    this.angle += 0.01;

    if (this.pos.y < 0) {
      // Bonus lost
      this.destroy();
    }

    super.update();
  }

  override collideWithObject(object: L.EngineObject): boolean {
    if (object instanceof Paddle) {
      emitter.emit('bonusCollected', this.type);
      this.destroy();
    }

    // No collision with anything
    return false;
  }
}
