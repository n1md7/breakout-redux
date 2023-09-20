import { Component, createSignal, Show } from 'solid-js';
import { gameOver, highScore, score } from '/src/ui/store';
import { BiSolidVideos } from 'solid-icons/bi';
import { VsDebugRestart } from 'solid-icons/vs';
import { emitter } from '/src/utils/Emitter';
import { IoExitOutline } from 'solid-icons/io';
import { GameRestart } from '/src/ui/GameRestart';

type Props = {};
export const GameOver: Component<Props> = () => {
  const [exit, setExit] = createSignal(false);
  const handleReStart = () => emitter.emit('re-start');
  const handleExit = () => setExit(true);
  const handleContinue = () => emitter.emit('continue');

  return (
    <dialog open={gameOver()}>
      <h2>Game Over</h2>
      <Show when={!exit()} fallback={<GameRestart />}>
        <fieldset>
          <legend>
            <b>Score</b>
          </legend>
          <div>
            <div>
              <div>Current Score</div>
              <b>{score()}</b>
            </div>
            <div>
              <div>High Score</div>
              <b>{highScore()}</b>
            </div>
          </div>
        </fieldset>
        <section class="actions">
          <button onClick={handleContinue}>
            Continue <BiSolidVideos />
          </button>
          <button onClick={handleReStart}>
            Re-start <VsDebugRestart />
          </button>
          <button onClick={handleExit}>
            Exit <IoExitOutline />{' '}
          </button>
        </section>
      </Show>
    </dialog>
  );
};
