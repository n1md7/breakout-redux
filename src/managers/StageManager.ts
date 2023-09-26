import { Game } from '/src/game/Game';
import * as L from 'littlejsengine/build/littlejs.esm';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Stage } from '/src/managers/stage/Stage';
import { bonusStage, stages } from '/src/managers/stage/stages';
import { bonusLevelCounter } from '/src/ui/store';

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

  showClickToStartText() {
    new L.FontImage().drawText('Click to Start', L.cameraPos.add(L.vec2(0, -5)), 0.1, true);
  }

  showCurrentStageText() {
    const text = this.game.mode.isBonus() ? 'Bonus Stage' : `Stage ${this.currentStage.name}`;
    new L.FontImage().drawText(text, cameraPos.add(L.vec2(0, 0)), 0.2, true);
  }

  showCounterText() {
    const navTextValues: string[] = [];
    navTextValues.push(`Score: ${String(this.game.score.toValue()).padStart(4, '0')}`);
    navTextValues.push(`Lives: ${String(this.game.lives.getValue()).padStart(2, '0')}`);
    if (!this.game.mode.isBonus()) {
      navTextValues.push(`Stage: ${String(this.game.stage.currentStage.name).padStart(2, '0')}`);
    }
    navTextValues.push(`Mode: ${this.game.mode.toString()}`);
    navTextValues.push(`High-Score: ${String(this.game.score.getHighScore()).padStart(6, '0')}`);

    if (this.game.mode.isBonus()) {
      navTextValues.push(`Ends: ${String(bonusLevelCounter()).padStart(2, '0')}`);
    }
    new L.FontImage().drawText(navTextValues.join(' | '), L.vec2(LevelSize.x * 0.5, LevelSize.y + 0.5), 0.07, true);
  }

  execute(level: number) {
    this.index = level;
    this.currentStage = this.stages[this.index];
  }

  next() {
    this.game.mode.toggleBonus(); // Every second stage is a bonus stage
    if (this.game.mode.isBonus()) this.currentStage = bonusStage;
    else {
      this.index = Math.min(this.index + 1, this.stages.length - 1);
      this.currentStage = this.stages[this.index];
      if (!this.currentStage.isUnlocked()) this.currentStage.unlock(this.index);
    }

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
