import { Component, createSignal } from 'solid-js';
import { Sound } from '/src/ui/settings/Sound';
import { Mode } from '/src/ui/settings/Mode';
import { Stages } from '/src/ui/settings/Stages';
import { emitter } from '/src/utils/Emitter';
import { Scores } from '/src/ui/components/Scores';
import { BsJoystick } from 'solid-icons/bs';
import { FaSolidHammer } from 'solid-icons/fa';
import { Visual } from '/src/ui/settings/Visual';
import config from '/src/utils/Config';

type Props = {};
export const GameStart: Component<Props> = () => {
  const [open, setOpen] = createSignal(true);
  const handleStart = () => {
    setOpen(false);
    emitter.emit('start');
  };

  return (
    <dialog open={open()}>
      <h2>
        {config.title} <FaSolidHammer />
      </h2>
      <Scores highScoreOnly />
      <Mode />
      <Stages />
      <Sound>
        <Visual />
      </Sound>
      <section class="actions">
        <button onClick={handleStart}>
          Play <BsJoystick size={'1.3em'} />
        </button>
      </section>
    </dialog>
  );
};
