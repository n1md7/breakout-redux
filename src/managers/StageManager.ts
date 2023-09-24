import { Game } from '/src/game/Game';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { BrickType } from '/src/enums/brick';
import { BrickUnbreakable } from '/src/components/brick/BrickUnbreakable';
import { BrickBreakable } from '/src/components/brick/BrickBreakable';
import { Stage } from '/src/managers/stage/Stage';
import { stages } from '/src/managers/stage/stages';

export class StageManager {
  private readonly game: Game;
  private readonly stages: Stage[];

  private index = 0;
  private currentStage: Stage;

  constructor(game: Game) {
    this.game = game;
    this.stages = stages;
    this.currentStage = this.stages[this.index];
  }

  get current() {
    return this.currentStage;
  }

  showStageText() {
    // if (this.game.paused) {
    //   new L.FontImage().drawText(
    //     `Stage ${String(this.index + 1).padStart(2, '0')}`,
    //     cameraPos.add(L.vec2(0, 0)),
    //     0.2,
    //     true,
    //   );
    // }
  }

  showClickToStartText() {
    new L.FontImage().drawText('Click to Start', L.cameraPos.add(L.vec2(0, -5)), 0.1, true);
  }

  showGameOverText() {
    // if (this.game.over) {
    //   new L.FontImage().drawText(`Game Over`, cameraPos.add(L.vec2(0, 0)), 0.2, true);
    // }
  }

  showCounterText() {
    const navTextValues = [
      `Score: ${String(this.game.score.toValue()).padStart(4, '0')}`,
      `Lives: ${String(this.game.lives.getValue()).padStart(2, '0')}`,
      `Stage: ${String(this.game.stage.currentStage.name).padStart(2, '0')}`,
      `Mode: ${this.game.mode.toString()}`,
      `High-Score: ${String(this.game.score.getHighScore()).padStart(6, '0')}`,
    ];
    new L.FontImage().drawText(navTextValues.join(' | '), L.vec2(LevelSize.x * 0.5, LevelSize.y + 0.5), 0.07, true);
  }

  execute(level: number) {
    this.index = level;
    this.currentStage = this.stages[this.index];
  }

  next() {
    this.index = Math.min(this.index + 1, this.stages.length - 1);
    this.currentStage = this.stages[this.index];

    this.start();
  }

  start() {
    this.game.bricks.destroy();
    this.game.bricks.populate();
  }

  restart() {
    this.game.bricks.destroy();
    this.game.bricks.populate();
  }

  isCleared() {
    return this.currentStage.brickCountEquals(this.game.bricks.destroyed);
  }
}
