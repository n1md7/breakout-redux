import env from './utils/Env';
import { Game } from '/src/game/Game';
import { emitter } from '/src/utils/Emitter';
import { mode, stage } from '/src/ui/store';

console.info('Is development mode:', env.isDevelopment());

const game = new Game();

emitter.on('start', () => {
  console.log('Game started', stage(), mode());
  game.run(mode(), stage());
});
