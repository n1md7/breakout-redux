import { LinkedList } from '/src/data-structures/LinkedList';
import { Ball } from '/src/components/Ball';
import * as L from 'littlejsengine/build/littlejs.esm';
import { RandomPicker } from '/src/components/utils/RandomPicker';

export class Balls {
  private readonly balls: LinkedList<Ball>;
  private readonly picker: RandomPicker<number>;
  private strength: number = 1;

  constructor() {
    this.balls = new LinkedList();
    // Choose a number between -0.5 and 0.5 with a 50% chance.
    this.picker = new RandomPicker([
      [-0.5, 0.5],
      [0.5, 0.5],
    ]);
  }

  add(ball: Ball) {
    this.balls.add(ball);
  }

  setStrength(strength: number) {
    this.strength = strength;
  }

  remove(ball: Ball) {
    this.balls.remove(ball);
  }

  spawnOneAt(position = L.cameraPos) {
    const x = this.picker.pick();
    const y = this.picker.pick();
    this.add(new Ball(L.vec2(position.x + x, position.y + y), this.strength));
  }

  spawnManyAt(position = L.cameraPos, count = 1) {
    for (let i = 0; i < count; i++) {
      this.spawnOneAt(position);
    }
  }

  double() {
    // Let's make sure we reference the array before we start modifying it.
    for (const ball of this.balls.toArray()) {
      this.spawnOneAt(ball.pos);
    }
  }

  triple() {
    // Let's make sure we reference the array before we start modifying it.
    for (const ball of this.balls.toArray()) {
      this.spawnManyAt(ball.pos, 2);
    }
  }

  hasValue() {
    return !this.balls.isEmpty();
  }

  escaped() {
    return this.balls.isEmpty();
  }

  getOne() {
    return this.balls.peek();
  }

  update() {
    for (const ball of this.balls) {
      if (ball.destroyed) this.balls.remove(ball);
      // Does not remove the ball right away, but waits for the next frame.
      if (ball.pos.y < -1) ball.destroy();
    }
  }

  *[Symbol.iterator]() {
    for (const ball of this.balls) {
      yield ball;
    }
  }

  reset() {
    this.balls.clear();
  }
}
