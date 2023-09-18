import { Game } from '/src/Game';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Levels } from '/src/commands/stage/Levels';
import { BrickType } from '/src/enums/brick';
import { BrickUnbreakable } from '/src/components/brick/BrickUnbreakable';
import { BrickBreakable } from '/src/components/brick/BrickBreakable';

type LevelType = {
  map: number[][];
  bricks: number;
};
export class StageCommand {
  private readonly game: Game;
  private readonly levels: LevelType[];
  private index = 0;
  private currentLevel: LevelType;

  constructor(game: Game) {
    this.game = game;
    this.levels = Levels.reduce((acc, map) => {
      return [
        ...acc,
        {
          map,
          bricks: map.reduce((acc, row) => {
            return (
              acc +
              row.reduce((acc, brick) => {
                return acc + (brick === 1 ? 1 : 0);
              }, 0)
            );
          }, 0),
        },
      ];
    }, [] as LevelType[]);
    this.currentLevel = this.levels[this.index];
  }

  showStageText() {
    if (this.game.paused) {
      new L.FontImage().drawText(
        `Stage ${String(this.index + 1).padStart(2, '0')}`,
        cameraPos.add(L.vec2(0, 0)),
        0.2,
        true,
      );
    }
  }

  showClickToStartText() {
    if (this.game.paused || this.game.over) {
      new L.FontImage().drawText('Click to Start', L.cameraPos.add(L.vec2(0, -5)), 0.1, true);
    }
  }

  showGameOverText() {
    if (this.game.over) {
      new L.FontImage().drawText(`Game Over`, cameraPos.add(L.vec2(0, 0)), 0.2, true);
    }
  }

  showCounterText() {
    const navTextValues = [
      `Score: ${String(this.game.score.toValue()).padStart(4, '0')}`,
      `Lives: ${String(this.game.lives.getValue()).padStart(2, '0')}`,
      `Time-Left: ${String(this.game.timeLeft).padStart(3, '0')}`,
      `Mode: ${this.game.modeCommand.current.displayName}`,
      `High-Score: ${String(this.game.score.getHighScore()).padStart(5, '0')}`,
    ];
    new L.FontImage().drawText(navTextValues.join(' | '), L.vec2(LevelSize.x * 0.5, LevelSize.y + 0.5), 0.07, true);
  }

  activateNext() {
    this.index = Math.min(this.index + 1, this.levels.length - 1);
    this.currentLevel = this.levels[this.index];
    this.restart();
  }

  restart() {
    this.reset();
    this.populateBlocks();
  }

  pause() {
    this.game.paused = true;
  }

  resume() {
    this.game.paused = false;
  }

  reset() {
    this.game.balls.reset();
    this.game.bricks.forEach((brick) => brick.destroy());
    this.game.bricks.length = 0;
    this.game.lives.restore();
    this.game.score.reset();
    this.game.destroyed.setVal(0);
    this.game.startedAt = L.time;
    this.game.modeCommand.clearTimers();
  }

  stageIsCleared() {
    return this.currentLevel.bricks === this.game.destroyed.getValue();
  }

  private populateBlocks() {
    if (this.currentLevel === null) return;

    const offsetX = 0;
    const offsetY = 10;
    const blockWidth = 2;
    const blockHeight = 1;
    for (const [y, row] of this.currentLevel?.map?.entries()) {
      for (const [x, type] of row.entries()) {
        if (type === BrickType.Empty) continue;
        const position = L.vec2(x * blockWidth + offsetX, y * blockHeight + offsetY);
        if (type === BrickType.Unbreakable) this.game.bricks.push(new BrickUnbreakable(position));
        if ([BrickType.Normal, BrickType.Hard].includes(type)) {
          this.game.bricks.push(new BrickBreakable(position));
        }
      }
    }
  }
}
