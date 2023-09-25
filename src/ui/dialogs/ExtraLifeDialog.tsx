import { adRewardDisabled, adRewardTimeLeft, extraLifeDialogShown } from '/src/ui/store';
import { Component, Show } from 'solid-js';
import { emitter } from '/src/utils/Emitter';
import { BiSolidVideos } from 'solid-icons/bi';

type Props = {};
export const ExtraLifeDialog: Component<Props> = () => {
  const handleCancel = () => {
    emitter.emit('getExtraLife', false);
  };
  const handleWatch = () => {
    emitter.emit('getExtraLife', true);
  };

  return (
    <dialog open={extraLifeDialogShown()}>
      <h2>Get extra life</h2>
      <p>Watch a short ad to get one last chance to beat your high score.</p>
      <section class="actions">
        <button onClick={handleCancel}>No, thanks</button>
        <button onClick={handleWatch} disabled={adRewardDisabled()}>
          Watch Ad <BiSolidVideos />{' '}
          <Show when={adRewardDisabled()}>
            <span class="timer">{String(adRewardTimeLeft()).padStart(2, '0')}</span>
          </Show>
        </button>
      </section>
    </dialog>
  );
};
