import { render } from 'solid-js/web';
import { GameStart } from '/src/ui/dialogs/GameStart';
import { GameOver } from '/src/ui/dialogs/GameOver';
import { ExtraLifeDialog } from '/src/ui/dialogs/ExtraLifeDialog';
import { GameWin } from '/src/ui/dialogs/GameWin';

window.CrazyGames.SDK.game
  .sdkGameLoadingStart()
  .then(() => console.info('CrazyGames SDK loading started'))
  .catch((error) => {
    console.error(`Error while loading CrazyGames SDK: ${error}`);
  });

render(
  () => (
    <>
      <GameStart />
      <GameOver />
      <GameWin />
      <ExtraLifeDialog />
    </>
  ),
  document.body,
);

window.CrazyGames.SDK.game
  .sdkGameLoadingStop()
  .then(() => console.info('CrazyGames SDK loading stopped'))
  .catch((error) => {
    console.error(`Error while stopping CrazyGames SDK loading: ${error}`);
  });
