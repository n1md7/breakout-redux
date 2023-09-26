import { Component, createEffect, createSignal, For } from 'solid-js';
import * as store from '/src/ui/store';
import { stagesUnlocked, unlockStage } from '/src/ui/store';
import { emitter } from '/src/utils/Emitter';

type Props = {};
// @ts-ignore
window.store = store;

export const Stages: Component<Props> = () => {
  const [currentStage, setCurrentStage] = createSignal(store.stage());

  const handleChange = (stage: number) => () => {
    store.setStage(stage);
    setCurrentStage(stage);
    emitter.emit('stageChange', stage);
  };

  createEffect(() => {
    emitter.on('stage-unlocked', unlockStage);

    return () => emitter.off('stage-unlocked', unlockStage);
  });

  return (
    <section>
      <fieldset>
        <legend>
          <b>Levels</b>
        </legend>
        <div class="levels">
          <For each={stagesUnlocked()} fallback={<div>No items</div>}>
            {(stage, idx) => (
              <div class="level">
                <input
                  disabled={!stage.unlocked}
                  type="radio"
                  id={stage.name}
                  name="stage"
                  onChange={handleChange(idx())}
                  checked={idx() === currentStage()} // Corrected code
                />
                <label for={stage.name}>{stage.name}</label>
              </div>
            )}
          </For>
        </div>
      </fieldset>
    </section>
  );
};
