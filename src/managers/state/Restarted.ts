import { State } from '/src/managers/state/State';
import * as L from 'littlejsengine/build/littlejs.esm';

export class Restarted extends State {
  override async attach() {
    await super.attach();

    this.game.stage.restart();
    this.game.balls.destroy();
    this.game.bonus.destroy();
    this.game.lives.restore();
  }

  override async detach() {
    await super.detach();
  }

  async update(dt: number) {
    if (L.mouseWasPressed(0) || L.gamepadWasPressed(0)) {
      await this.game.state.changeTo('started');
    }
    this.game.stage.showCurrentStageText();
    this.game.stage.showClickToStartText();
  }
}
