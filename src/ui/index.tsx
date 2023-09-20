import { render } from 'solid-js/web';
import { GameStart } from '/src/ui/GameStart';
import { GameOver } from '/src/ui/GameOver';

render(() => <GameStart />, document.body);
render(() => <GameOver />, document.body);
