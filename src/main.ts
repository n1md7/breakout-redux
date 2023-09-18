import env from './utils/Env';
import { Game } from '/src/game/Game';
import { dialog, selected } from '/src/ui/lobby';

dialog.showModal();

console.info('Is development mode:', env.isDevelopment());

const game = new Game();

dialog.addEventListener('close', (e) => {
  // Prevent ESC key from closing the dialog, enforce user to click on a button.
  if (!['0', '1', '2'].includes(dialog.returnValue)) dialog.showModal();

  game.run(selected.mode, selected.level);
  console.log(selected);
});
