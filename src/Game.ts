import * as L from 'littlejsengine/build/littlejs.esm';
import { Paddle } from '/src/components/Paddle';
import { Ball } from '/src/components/Ball';
import { Wall } from '/src/components/Wall';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Brick } from '/src/components/Brick';
import { Score } from '/src/ui/Score';

export class Game {
  private paddle: Paddle | null = null;
  private ball: Ball | null = null;
  private bricks: Brick[] = [];
  private walls: Wall[] = [];

  private readonly score: Score;

  constructor() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.postUpdate = this.postUpdate.bind(this);
    this.render = this.render.bind(this);
    this.postRender = this.postRender.bind(this);

    this.score = new Score(0);
  }

  run() {
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender);
  }

  private init() {
    L.setCanvasFixedSize(new L.Vector2(1280, 720));

    for (let x = 2; x <= LevelSize.x - 2; x += 2) {
      for (let y = 12; y <= LevelSize.y - 2; y++) {
        this.bricks.push(new Brick(L.vec2(x, y)));
      }
    }

    L.setCameraPos(LevelSize.scale(0.5));

    this.paddle = new Paddle(LevelSize);
    this.ball = new Ball(L.cameraPos, this.score);
    this.walls = [
      new Wall(L.vec2(-0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y)),
      new Wall(L.vec2(LevelSize.x + 0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y)),
      new Wall(L.vec2(LevelSize.x * 0.5, LevelSize.y), L.vec2(LevelSize.x + 2, 1)),
    ];
  }

  private update() {
    L.drawRect(cameraPos, L.vec2(100, 100), new L.Color(0.5, 0.5, 0.5, 0.5));
    L.drawRect(cameraPos, LevelSize, new L.Color(0.1, 0.1, 0.1));

    if (!this.ball || this.ball.pos.y < -1) {
      this.ball?.destroy();
      this.ball = new Ball(L.cameraPos, this.score);
    }
  }

  private postUpdate() {}

  private render() {}

  private postRender() {
    L.drawTextScreen(`Score: ${this.score.toString()}`, L.vec2(L.mainCanvasSize.x * 0.5, 70), 40, new L.Color(1, 1, 1));
  }
}
