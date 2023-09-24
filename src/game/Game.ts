import * as L from 'littlejsengine/build/littlejs.esm';
import { Paddle } from '/src/components/Paddle';
import { Wall } from '/src/components/Wall';
import { LevelSize } from '/src/constants/level';
import { Score } from '/src/game/utils/Score';
import Tilemap from '/src/assets/bricks/tiles.png';
import { Debug } from '/src/utils/Debug';
import { emitter } from '/src/utils/Emitter';
import { BonusType } from '/src/enums/bonus';
import { BonusManager } from '/src/managers/BonusManager';
import { StageManager } from '/src/managers/StageManager';
import { ExtraBalls } from '/src/components/utils/ExtraBalls';
import { Balls } from '/src/components/Balls';
import { ModeManager } from '/src/managers/ModeManager';
import { GameMode } from '/src/enums/mode';
import { Brick } from '/src/components/brick/Brick';
import { Counter } from '/src/components/utils/Counter';
import { StateManager } from '/src/managers/StateManager';
import { sound } from '/src/ui/store';

L.setShowWatermark(Debug.enabled());
L.setSoundEnable(sound());
Debug.disabled() && L.setDebugKey(-1);

export class Game {
  readonly levelTime: number = 90; // seconds
  readonly lives: ExtraBalls;
  readonly score: Score;
  readonly destroyedBricks: Counter;

  readonly mode: ModeManager;
  readonly bonus: BonusManager;
  readonly stage: StageManager;
  readonly state: StateManager;

  paddle: Paddle | null = null;
  balls: Balls;
  bricks: Brick[] = [];
  floor: Wall | null = null;
  startedAt: number = 0;

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
    this.lives = new ExtraBalls(3);

    this.bonus = new BonusManager(this);
    this.stage = new StageManager(this);
    this.mode = new ModeManager(this);
    this.state = new StateManager(this);
  }

  public get timeLeft() {
    const delta = Math.floor(L.time - this.startedAt);
    return this.levelTime - delta;
  }

  run(mode: GameMode, stage: number) {
    this.stage.execute(stage);
    this.mode.execute(mode);
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender, Tilemap);
    emitter.on('bonusCollected', this.onBonusCollected);
    emitter.on('brickDestroyed', this.onBrickDestroyed);
  }

  private init() {
    L.setCanvasFixedSize(new L.Vector2(1280, 720));
    L.setCameraPos(LevelSize.scale(0.5));

    this.paddle = new Paddle(LevelSize);

    new Wall(L.vec2(-0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x + 0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x * 0.5, LevelSize.y), L.vec2(LevelSize.x + 2, 1));

    this.startedAt = L.time;
    this.stage.restart();

    // Give it a chance to render the first frame
    setTimeout(() => this.state.changeTo('idle'));
  }

  private update() {
    this.state.update(L.timeDelta);
  }

  private postUpdate() {
    this.mode.update();
  }

  private render() {
    // Background drawing
    L.drawRect(L.cameraPos, L.vec2(100, 100), new L.Color().setHex('#494746'));
    L.drawRect(L.cameraPos, LevelSize, new L.Color().setHex('#ce9a80'));
  }

  private postRender() {
    this.stage.showCounterText();
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
}
