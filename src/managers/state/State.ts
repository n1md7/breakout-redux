import { Game } from '/src/game/Game';

export abstract class State {
  constructor(protected readonly game: Game) {}

  async attach() {
    console.group(`${this.constructor.name} state`);
    console.debug('Attached');
  }

  async detach() {
    console.debug('Detached');
    console.groupEnd();
  }

  update(dt: number) {}
}
