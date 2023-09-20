import env from './utils/Env';
import { Game } from '/src/game/Game';
import { emitter } from '/src/utils/Emitter';
import { mode, stage } from '/src/ui/store';
import { GameMode } from '/src/enums/mode';

console.info('Is development mode:', env.isDevelopment());

const game = new Game();

emitter.on('start', () => {
  console.log('Game started', {
    mode: mode(),
    stage: GameMode[mode()],
  });
  game.run(mode(), stage());
});

emitter.on('mode', () => {
  console.log('Mode changed', {
    mode: mode(),
  });
});

emitter.on('stage', () => {
  console.log('Stage changed', {
    stage: GameMode[mode()],
  });
});

emitter.on('re-start', () => {
  console.log('Game restarted');
});

emitter.on('start-over', () => {
  console.log('Game start-over');
});

emitter.on('continue', () => {
  console.log('Game continued, request Ad');
});
