import { Component, createEffect, createSignal, Show } from 'solid-js';
import { emitter } from '/src/utils/Emitter';
import { adRewardDisabled, adRewardTimeLeft, gameWinDialogShown, mode } from '/src/ui/store';
import { Scores } from '/src/ui/components/Scores';
import { TbMultiplier2x } from 'solid-icons/tb';
import { BiSolidVideos } from 'solid-icons/bi';
import { VsDebugRestart } from 'solid-icons/vs';
import { ImNext2 } from 'solid-icons/im';
import { GameMode } from '/src/enums/mode';

type Props = {};
export const GameWin: Component<Props> = () => {
  const [disabled, setDisabled] = createSignal(false);
  const handleDouble = () => emitter.emit('doubleWin');

  const handleRestart = () => emitter.emit('restartStage');

  const handleNext = () => emitter.emit('nextStage');

  createEffect(() => {
    setDisabled(mode() === GameMode.Bonus);
  }, [mode()]);

  return (
    <dialog open={gameWinDialogShown()}>
      <h2>
        You win! <span class="emoji">🎉</span>
      </h2>
      <Scores />
      <section class="actions">
        <button onClick={handleDouble} disabled={adRewardDisabled()}>
          Double score
          <TbMultiplier2x />
          <BiSolidVideos />
          <Show when={adRewardDisabled()}>
            <span class="timer">{String(adRewardTimeLeft()).padStart(2, '0')}</span>
          </Show>
        </button>
        <button onClick={handleRestart} disabled={disabled()}>
          Restart <VsDebugRestart />
        </button>
        <button onClick={handleNext}>
          Next <ImNext2 />
        </button>
      </section>
    </dialog>
  );
};
