import env from './utils/Env';
import { Game } from '/src/game/Game';
import { emitter } from '/src/utils/Emitter';
import * as store from '/src/ui/store';

console.info('Is development mode:', env.isDevelopment());

const game = new Game();
// @ts-ignore
window.game = game;
// @ts-ignore
window.store = store;

emitter.on('start', () => {
  game.run(store.mode(), store.stage());
  return window.CrazyGames.SDK.game.gameplayStart();
});
