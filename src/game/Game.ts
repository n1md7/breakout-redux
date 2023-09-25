import * as L from 'littlejsengine/build/littlejs.esm';
import { Paddle } from '/src/components/Paddle';
import { Wall } from '/src/components/Wall';
import { LevelSize } from '/src/constants/level';
import { Score } from '/src/game/utils/Score';
import Tilemap from '/src/assets/bricks/tiles.png';
import { Debug } from '/src/utils/Debug';
import { BonusManager } from '/src/managers/BonusManager';
import { StageManager } from '/src/managers/StageManager';
import { ExtraBalls } from '/src/components/utils/ExtraBalls';
import { Balls } from '/src/components/Balls';
import { ModeManager } from '/src/managers/ModeManager';
import { GameMode } from '/src/enums/mode';
import { StateManager } from '/src/managers/StateManager';
import { sound } from '/src/ui/store';
import { BrickManager } from '/src/managers/BrickManager';
import { AdManager } from '/src/managers/AdManager';

L.setShowWatermark(Debug.enabled());
L.setSoundEnable(sound());
Debug.disabled() && L.setDebugKey(-1);

export class Game {
  readonly lives: ExtraBalls;
  readonly score: Score;

  readonly mode: ModeManager;
  readonly bonus: BonusManager;
  readonly stage: StageManager;
  readonly state: StateManager;
  readonly bricks: BrickManager;
  readonly ads: AdManager;

  balls: Balls;
  paddle: Paddle | null = null;
  floor: Wall | null = null;

  constructor() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.postUpdate = this.postUpdate.bind(this);
    this.render = this.render.bind(this);
    this.postRender = this.postRender.bind(this);

    this.balls = new Balls();
    this.score = new Score(0);
    this.lives = new ExtraBalls(3);

    this.bonus = new BonusManager(this);
    this.stage = new StageManager(this);
    this.mode = new ModeManager(this);
    this.state = new StateManager(this);
    this.bricks = new BrickManager(this);
    this.ads = new AdManager();
  }

  run(mode: GameMode, stage: number) {
    this.stage.execute(stage);
    this.mode.execute(mode);
    L.engineInit(this.init, this.update, this.postUpdate, this.render, this.postRender, Tilemap);
  }

  private init() {
    L.setCanvasFixedSize(new L.Vector2(1280, 720));
    L.setCameraPos(LevelSize.scale(0.5));

    this.paddle = new Paddle(LevelSize);

    new Wall(L.vec2(-0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x + 0.5, LevelSize.y * 0.5), L.vec2(1, LevelSize.y));
    new Wall(L.vec2(LevelSize.x * 0.5, LevelSize.y), L.vec2(LevelSize.x + 2, 1));

    this.stage.start();

    // Give it a chance to render the first frame
    setTimeout(() => this.state.changeTo('idle'));
  }

  private update() {
    this.state.update(L.timeDelta);
  }

  private async postUpdate() {
    await this.mode.update();
  }

  private render() {
    // Background drawing
    L.drawRect(L.cameraPos, L.vec2(100, 100), new L.Color().setHex('#494746'));
    L.drawRect(L.cameraPos, LevelSize, new L.Color().setHex('#ce9a80'));
  }

  private postRender() {
    this.stage.showCounterText();
  }
}
