import { Component } from 'solid-js';
import { emitter } from '/src/utils/Emitter';
import { Mode } from '/src/ui/settings/Mode';
import { Stages } from '/src/ui/settings/Stages';
import { Sound } from '/src/ui/settings/Sound';

type Props = {};
export const GameRestart: Component<Props> = () => {
  const handleReStart = () => emitter.emit('start-over');

  return (
    <>
      <Mode />
      <Stages />
      <Sound />
      <section class="actions">
        <button onClick={handleReStart}>Start</button>
      </section>
    </>
  );
};
