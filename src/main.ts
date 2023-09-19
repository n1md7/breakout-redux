import env from './utils/Env';
import { Game } from '/src/game/Game';
import { dialog, selected } from '/src/ui/lobby';

dialog.showModal();

console.info('Is development mode:', env.isDevelopment());

const game = new Game();

dialog.addEventListener('close', (e) => {
  game.run(selected.mode, selected.level);
  console.log(selected);
});
