import { State } from '/src/managers/state/State';
import * as L from 'littlejsengine/build/littlejs.esm';

export class Idle extends State {
  override async attach() {
    await super.attach();

    this.game.balls.reset();
    this.game.bonus.reset();
  }

  async update(dt: number) {
    if (L.mouseWasPressed(0) || L.gamepadWasPressed(0)) {
      await this.game.state.changeTo('started');
    }
    this.game.stage.showStageText();
    this.game.stage.showClickToStartText();
  }
}
