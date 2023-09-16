import * as L from 'littlejsengine/build/littlejs.esm';
import { Paddle } from '/src/components/Paddle';
import { Ball } from '/src/components/Ball';
import { Wall } from '/src/components/Wall';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Brick } from '/src/components/Brick';
import { Score } from '/src/ui/Score';
import Tilemap from '/src/assets/bricks/tiles.png';
import { Debug } from '/src/utils/Debug';
import { Bonus } from '/src/components/Bonus';
import { emitter } from '/src/utils/Emitter';
import { BonusType } from '/src/enums/bonus';
import { Bonuses } from '/src/constants/bonus';

Debug.disabled() && L.setDebugKey(-1);

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
    this.onBonusCollected = this.onBonusCollected.bind(this);
    this.onBrickDestroyed = this.onBrickDestroyed.bind(this);

    this.score = new Score(0);
  }

  run() {
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender, Tilemap);
    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);
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
      new Wall(L.vec2(LevelSize.x * 0.5, 0), L.vec2(LevelSize.x + 2, 1)),
    ];

    new Bonus(L.vec2(10, LevelSize.y - 2), BonusType.Wall);
  }

  private update() {
    L.drawRect(cameraPos, L.vec2(100, 100), new L.Color().setHex('#494746'));
    L.drawRect(cameraPos, LevelSize, new L.Color().setHex('#ce9a80'));

    if (!this.ball || this.ball.pos.y < -1) {
      this.ball?.destroy();
      this.ball = new Ball(L.cameraPos);
    }
  }

  private postUpdate() {}

  private render() {}

  private postRender() {
    L.drawTextScreen(`Score: ${this.score.toString()}`, L.vec2(L.mainCanvasSize.x * 0.5, 70), 24, new L.Color(1, 1, 1));
  }

  private onBonusCollected(type: BonusType) {
    console.log('Bonus collected', type);
  }

  private onBrickDestroyed(score: number) {
    this.score.add(score);
    if (this.score.toValue() % 5 === 0) {
      const type = Bonuses[L.randInt(0, Bonuses.length - 1)];
      const position = L.vec2(L.randInt(2, LevelSize.x - 2), LevelSize.y - 2);
      new Bonus(position, type);
    }
  }
}
