import { State } from '/src/managers/state/State';
import * as L from 'littlejsengine/build/littlejs.esm';

export class Idle extends State {
  override async attach() {
    await super.attach();
  }

  override async detach() {
    await super.detach();
  }

  async update(dt: number) {
    if (L.mouseWasPressed(0) || L.gamepadWasPressed(0)) {
      await this.game.state.changeTo('started');
    }
    this.game.stage.showClickToStartText();
  }
}
