import { Component, createSignal, JSX } from 'solid-js';
import { emitter } from '/src/utils/Emitter';
import { music, setMusic, setPostProcessing, postProcessing, sound, setSound } from '/src/ui/store';

type Props = {
  children?: JSX.Element;
};

export const Sound: Component<Props> = ({ children }) => {
  const handleSound = ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    setSound(checked);
    emitter.emit('sound', checked);
  };

  const handleMusic = ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    setMusic(checked);
    emitter.emit('music', checked);
  };

  return (
    <section class="sound visual-effects">
      <div>
        <fieldset>
          <legend>
            <b>Sound/Music</b>
          </legend>
          <div>
            <input type="checkbox" id="sound" checked={sound()} onChange={handleSound} />
            <label for="sound">Sound</label>

            <input type="checkbox" id="music" checked={music()} onChange={handleMusic} disabled={true} />
            <label for="music">Music</label>
          </div>
        </fieldset>
        {children}
      </div>
    </section>
  );
};
