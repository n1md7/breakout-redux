import { State } from '/src/managers/state/State';
import { Sounds } from '/src/constants/sound';
import * as L from 'littlejsengine/build/littlejs.esm';

export class Started extends State {
  override async attach() {
    await super.attach();

    if (!this.game.balls.hasValue() && this.game.lives.hasValue()) {
      Sounds.GameStart.play();
      this.game.balls.spawnOneAt(L.cameraPos); // Center of the screen
    }
  }

  override async update(dt: number) {
    this.game.balls.update();

    if (this.game.balls.escaped()) {
      this.game.balls.reset();
      this.game.lives.decrement();
      if (this.game.lives.runOut()) {
        return await this.game.state.changeTo('extraLifeDialog');
      }
      // Fallback to idle state. "Click to start" screen
      return await this.game.state.changeTo('idle');
    }

    if (this.game.stage.isCleared()) {
      return await this.game.state.changeTo('stageWinDialog');
    }
  }
}
