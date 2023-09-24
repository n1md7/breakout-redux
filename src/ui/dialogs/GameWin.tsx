import { Component } from 'solid-js';
import { emitter } from '/src/utils/Emitter';
import { gameWinDialogShown } from '/src/ui/store';
import { Scores } from '/src/ui/components/Scores';
import { TbMultiplier2x } from 'solid-icons/tb';
import { BiSolidVideos } from 'solid-icons/bi';
import { VsDebugRestart } from 'solid-icons/vs';
import { ImNext2 } from 'solid-icons/im';

type Props = {};
export const GameWin: Component<Props> = () => {
  const handleDouble = () => emitter.emit('doubleWin');

  const handleRestart = () => emitter.emit('restartStage');

  const handleNext = () => emitter.emit('nextStage');

  return (
    <dialog open={gameWinDialogShown()}>
      <h2>
        You win! <span class="emoji">🎉</span>
      </h2>
      <Scores />
      <section class="actions">
        <button onClick={handleDouble}>
          Double score
          <TbMultiplier2x />
          <BiSolidVideos />
        </button>
        <button onClick={handleRestart}>
          Restart <VsDebugRestart />
        </button>
        <button onClick={handleNext}>
          Next <ImNext2 />
        </button>
      </section>
    </dialog>
  );
};
