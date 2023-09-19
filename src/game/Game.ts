import * as L from 'littlejsengine/build/littlejs.esm';
import { Paddle } from '/src/components/Paddle';
import { Wall } from '/src/components/Wall';
import { LevelSize } from '/src/constants/level';
import { Score } from '/src/game/utils/Score';
import Tilemap from '/src/assets/bricks/tiles.png';
import { Debug } from '/src/utils/Debug';
import { emitter } from '/src/utils/Emitter';
import { BonusType } from '/src/enums/bonus';
import { BonusCommand } from '/src/commands/BonusCommand';
import { Sounds } from '/src/constants/sound';
import { StageCommand } from '/src/commands/StageCommand';
import { Lives } from '/src/components/utils/Lives';
import { Balls } from '/src/components/Balls';
import { ModeCommand } from '/src/commands/ModeCommand';
import { GameMode } from '/src/enums/mode';
import { Brick } from '/src/components/brick/Brick';
import { Counter } from '/src/components/utils/Counter';

L.setShowWatermark(Debug.enabled());
Debug.disabled() && L.setDebugKey(-1);

export class Game {
  public paddle: Paddle | null = null;
  public balls: Balls;
  public bricks: Brick[] = [];
  public floor: Wall | null = null;
  public over: boolean = false;
  public paused: boolean = true;
  public idle: boolean = false;
  public startedAt: number = 0;

  public readonly levelTime: number = 90; // seconds
  public readonly lives: Lives;
  public readonly score: Score;
  public readonly destroyedBricks: Counter;
  public readonly mode: ModeCommand;
  private readonly bonus: BonusCommand;
  private readonly stage: StageCommand;

  constructor() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.postUpdate = this.postUpdate.bind(this);
    this.render = this.render.bind(this);
    this.postRender = this.postRender.bind(this);
    this.onBonusCollected = this.onBonusCollected.bind(this);
    this.onBrickDestroyed = this.onBrickDestroyed.bind(this);

    this.balls = new Balls();
    this.score = new Score(0);
    this.destroyedBricks = new Counter(0, 0, 999);
    this.lives = new Lives(3);

    this.bonus = new BonusCommand(this);
    this.stage = new StageCommand(this);
    this.mode = new ModeCommand(this);
  }

  run(mode: GameMode, stage: number) {
    this.stage.execute(stage);
    this.mode.execute(mode);
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender, Tilemap);
    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);
  }

  private init() {
    // Show the wall initially, to make sure the user won't lose instantly
    this.bonus.collect(BonusType.ExtraWall);

    L.setCanvasFixedSize(new L.Vector2(1280, 720));
    L.setCameraPos(LevelSize.scale(0.5));

    this.paddle = new Paddle(LevelSize);
    new Wall(L.vec2(-0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x + 0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x * 0.5, LevelSize.y), L.vec2(LevelSize.x + 2, 1));
    this.startedAt = L.time;
    this.stage.restart();
  }

  private update() {
    const mouseKeyPressed = L.mouseWasPressed(0) || L.gamepadWasPressed(0);
    if (mouseKeyPressed) {
      // Start the game
      this.startedAt = L.time;
      this.paused = false;
      this.over = false;
    }

    if (this.over) return;
    if (this.paused) return;

    this.balls.update();

    if (this.balls.escaped() && !this.idle) {
      this.lives.decrement(); // Lost 1 life
      if (this.lives.runOut()) {
        // TODO: Play game over sound
        this.over = true;
        return console.info('Game over');
      }
      this.idle = true;
    }

    if (mouseKeyPressed) {
      if (!this.balls.hasValue() && this.lives.hasValue()) {
        Sounds.GameStart.play();
        this.balls.spawnOneAt(L.cameraPos); // Center of the screen
        this.idle = false;
      }
    }
  }

  private postUpdate() {
    this.mode.update();
    if (this.stage.isCleared()) {
      console.log('winner');
      this.stage.pause();
      this.stage.activateNext();
    }
  }

  private render() {
    // Background drawing
    L.drawRect(L.cameraPos, L.vec2(100, 100), new L.Color().setHex('#494746'));
    L.drawRect(L.cameraPos, LevelSize, new L.Color().setHex('#ce9a80'));
  }

  private postRender() {
    this.stage.showCounterText();
    this.stage.showClickToStartText();
    this.stage.showGameOverText();
    this.stage.showStageText();
  }

  private onBonusCollected(bonus: BonusType) {
    this.bonus.collect(bonus);
  }

  private onBrickDestroyed(brick: Brick) {
    this.score.add(brick.score);
    if (brick.isBreakable) this.destroyedBricks.increment();
    // No bonuses in classic mode
    if (this.mode.isClassic()) return;

    if (this.score.toValue() % 1 === 0) {
      this.bonus.produce(this.mode.pickBonusType());
    }
  }

  public get timeLeft() {
    const delta = Math.floor(L.time - this.startedAt);
    return this.levelTime - delta;
  }
}
