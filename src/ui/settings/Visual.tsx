import { postProcessing, setPostProcessing } from '/src/ui/store';
import { Component } from 'solid-js';
import { emitter } from '/src/utils/Emitter';

type Props = {};

export const Visual: Component<Props> = () => {
  const handlePostProcessing = ({ target }: Event) => {
    const { checked } = target as HTMLInputElement;
    setPostProcessing(checked);
    emitter.emit('postProcessing', postProcessing);
  };

  return (
    <fieldset>
      <legend>
        <b>Visual effects</b>
      </legend>
      <div>
        <input type="checkbox" id="post-processing" onChange={handlePostProcessing} checked={postProcessing()} />
        <label for="post-processing">Post processing</label>
      </div>
    </fieldset>
  );
};
