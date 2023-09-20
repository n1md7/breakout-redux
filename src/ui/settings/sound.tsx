import { Component, createSignal, JSX } from 'solid-js';
import { emitter } from '/src/utils/Emitter';

type Props = {};

export const Sound: Component<Props> = () => {
  const [sound, setSound] = createSignal(true);
  const [music, setMusic] = createSignal(true);

  const handleSound = ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    setSound(checked);
    emitter.emit('sound', checked);
  };

  const handleMusic = () => {
    setMusic(!music());
    emitter.emit('music', !music());
  };

  return (
    <section>
      <fieldset>
        <legend>
          <b>Sound/Music</b>
        </legend>
        <div>
          <input type="checkbox" id="sound" checked={sound()} onChange={handleSound} />
          <label for="sound">Sound</label>

          <input type="checkbox" id="music" checked={music()} onChange={handleMusic} />
          <label for="music">Music</label>
        </div>
      </fieldset>
    </section>
  );
};
