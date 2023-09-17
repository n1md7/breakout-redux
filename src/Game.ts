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
import { BonusCommand } from '/src/commands/BonusCommand';
import { Sounds } from '/src/constants/sound';

L.setShowWatermark(Debug.enabled());
Debug.disabled() && L.setDebugKey(-1);

export class Game {
  public paddle: Paddle | null = null;
  public balls: Ball[] = [];
  public bricks: Brick[] = [];
  public lives = 3;
  public floor: Wall | null = null;
  public over: boolean = false;
  public startedAt: number = 0;

  public readonly levelTime: number = 90; // seconds
  public readonly score: Score;
  private readonly bonusCommand: BonusCommand;

  constructor() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.postUpdate = this.postUpdate.bind(this);
    this.render = this.render.bind(this);
    this.postRender = this.postRender.bind(this);
    this.onBonusCollected = this.onBonusCollected.bind(this);
    this.onBrickDestroyed = this.onBrickDestroyed.bind(this);

    this.score = new Score(0);
    this.bonusCommand = new BonusCommand(this);
  }

  run() {
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender, Tilemap);
    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);
    this.startedAt = L.time;
  }

  private init() {
    L.setCanvasFixedSize(new L.Vector2(1280, 720));

    // TODO add using array for each level
    for (let x = 2; x <= LevelSize.x - 2; x += 2) {
      for (let y = 12; y <= LevelSize.y - 2; y++) {
        this.bricks.push(new Brick(L.vec2(x, y)));
      }
    }

    setInterval(() => {
      for (const brick of this.bricks) {
        brick.pos.y -= 1;
      }
    }, 10000);
    // TODO configure based on level

    L.setCameraPos(LevelSize.scale(0.5));

    this.paddle = new Paddle(LevelSize);
    new Wall(L.vec2(-0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x + 0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x * 0.5, LevelSize.y), L.vec2(LevelSize.x + 2, 1));
  }

  private update() {
    const mouseKeyPressed = L.mouseWasPressed(0) || L.gamepadWasPressed(0);

    for (const ball of this.balls) {
      if (ball.destroyed) continue;

      if (ball.pos.y < -1) ball.destroy();
    }

    this.balls = this.balls.filter((brick) => !brick.destroyed);

    if (this.balls.length === 0 && mouseKeyPressed) {
      if (--this.lives <= 0) {
        return console.log('Game over');
      } else {
        Sounds.GameStart.play();
        this.balls.push(new Ball(L.cameraPos));
      }
    }
  }

  private postUpdate() {}

  private render() {
    // Background drawing
    L.drawRect(cameraPos, L.vec2(100, 100), new L.Color().setHex('#494746'));
    L.drawRect(cameraPos, LevelSize, new L.Color().setHex('#ce9a80'));
  }

  private postRender() {
    const navTextValues = [
      `Score: ${this.score.toValue()}`,
      `Lives: ${this.lives}`,
      `Time-Left: ${String(this.timeLeft).padStart(2, '0')}`,
      `High-Score: ${this.score.getHighScore()}`,
    ];
    const font = new L.FontImage();
    font.drawText(navTextValues.join(' | '), L.vec2(LevelSize.x * 0.5, LevelSize.y + 0.5), 0.07, true);
    font.drawText(`Stage 01`, cameraPos.add(L.vec2(0, 0)), 0.2, true);
    font.drawText('Click to Start', cameraPos.add(L.vec2(0, -5)), 0.1, true);
    // Todo isolate this in separate class
  }

  private onBonusCollected(type: BonusType) {
    console.log('Bonus collected', type);
    this.bonusCommand.execute(type);
  }

  private onBrickDestroyed(score: number) {
    this.score.add(score);
    if (this.score.toValue() % 1 === 0) {
      const type = Bonuses[L.randInt(0, Bonuses.length - 1)];
      const position = L.vec2(L.randInt(2, LevelSize.x - 2), LevelSize.y - 2);
      new Bonus(position, type);
    }
  }

  private get timeLeft() {
    const delta = Math.floor(L.time - this.startedAt);
    return this.levelTime - delta;
  }
}
