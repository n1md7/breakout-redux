import { Component } from 'solid-js';
import { gameOverDialogShown, setGameOverDialogShown } from '/src/ui/store';
import { Mode } from '/src/ui/settings/Mode';
import { Stages } from '/src/ui/settings/Stages';
import { Sound } from '/src/ui/settings/Sound';
import { emitter } from '/src/utils/Emitter';
import { Scores } from '/src/ui/components/Scores';

type Props = {};
export const GameOver: Component<Props> = () => {
  const handleStart = () => emitter.emit('startClick');

  return (
    <dialog open={gameOverDialogShown()}>
      <h2>Game Over</h2>
      <Scores />
      <Mode />
      <Stages />
      <Sound />
      <section class="actions">
        <button onClick={handleStart}>Start</button>
      </section>
    </dialog>
  );
};
