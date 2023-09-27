import { oldTVScreenEffect, setOldTVScreenEffect } from '/src/ui/store';
import { Component } from 'solid-js';
import { emitter } from '/src/utils/Emitter';

type Props = {};

export const Visual: Component<Props> = () => {
  const handlePostProcessing = ({ target }: Event) => {
    setOldTVScreenEffect((target as HTMLInputElement).checked);
  };

  return (
    <fieldset>
      <legend>
        <b>Visual effects</b>
      </legend>
      <div>
        <input type="checkbox" id="old-tv-screen" onChange={handlePostProcessing} checked={oldTVScreenEffect()} />
        <label for="old-tv-screen">Old TV screen</label>
      </div>
    </fieldset>
  );
};
