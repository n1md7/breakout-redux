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
      `Mode: ${this.game.mode.current.displayName}`,
      `High-Score: ${String(this.game.score.getHighScore()).padStart(6, '0')}`,
    ];
    new L.FontImage().drawText(navTextValues.join(' | '), L.vec2(LevelSize.x * 0.5, LevelSize.y + 0.5), 0.07, true);
  }

  execute(level: number) {
    this.index = level;
    this.currentStage = this.stages[this.index];
    this.restart();
  }

  next() {
    this.index = Math.min(this.index + 1, this.stages.length - 1);
    this.currentStage = this.stages[this.index];
    this.restart();
  }

  restart() {
    this.reset();
    this.populateBlocks();
    this.game.mode.current.apply();
  }

  reset() {
    this.game.balls.reset();
    this.game.bricks.forEach((brick) => brick.destroy());
    this.game.bricks.length = 0;
    this.game.lives.restore();
    this.game.destroyedBricks.setVal(0);
    this.game.mode.clearTimers();
  }

  isCleared() {
    return this.currentStage.getBrickCount() === this.game.destroyedBricks.getValue();
  }

  private populateBlocks() {
    if (this.currentStage === null) return;

    for (const [type, position] of this.currentStage.getCoords()) {
      if (type === BrickType.Unbreakable) {
        this.game.bricks.push(new BrickUnbreakable(position));
        continue;
      }

      if ([BrickType.Normal, BrickType.Hard].includes(type)) {
        this.game.bricks.push(new BrickBreakable(position));
      }
    }
  }
}
