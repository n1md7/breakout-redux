import { Bonus } from '/src/command/Bonus';
import { Game } from '/src/Game';
import { Ball } from '/src/components/Ball';
import * as L from 'littlejsengine/build/littlejs.esm';

export class PickBalls extends Bonus {
  constructor(game: Game) {
    super(game);
  }

  apply() {
    const [ball] = this.game.balls;
    if (!ball || ball.destroyed) return;

    this.game.balls.push(
      new Ball(L.vec2(ball.pos.x, ball.pos.y + 0.5)),
      new Ball(L.vec2(ball.pos.x, ball.pos.y - 0.5)),
      new Ball(L.vec2(ball.pos.x - 0.5, ball.pos.y)),
    );
  }
}
