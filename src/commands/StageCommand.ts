import { Game } from '/src/Game';
import { cameraPos } from 'littlejsengine/build/littlejs.esm';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';

export class StageCommand {
  private readonly game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  showStageText() {
    if (this.game.paused) {
      new L.FontImage().drawText(`Stage 01`, cameraPos.add(L.vec2(0, 0)), 0.2, true);
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
    // todo
  }

  restart() {
    // todo
  }

  pause() {
    this.game.paused = true;
  }

  resume() {
    this.game.paused = false;
  }
}
