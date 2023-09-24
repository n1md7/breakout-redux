import { State } from '/src/managers/state/State';

export class Restarted extends State {
  override async attach() {
    await super.attach();

    this.game.stage.restart();
    await this.game.state.changeTo('idle');
  }
}
