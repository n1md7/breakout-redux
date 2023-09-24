import { State } from '/src/managers/state/State';
import L from 'littlejsengine/build/littlejs.esm';

export class NextStage extends State {
  override async attach() {
    await super.attach();

    this.game.stage.next();
    await this.game.state.changeTo('idle');
  }
}
