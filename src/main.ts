import env from './utils/Env';
import { Game } from '/src/Game';

// drawRect(0, 0, 100, 100, 0xff0000);
console.info('Is development mode:', env.isDevelopment());

const game = new Game();
game.run();
