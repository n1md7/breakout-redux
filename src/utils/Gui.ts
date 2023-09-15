import { Debug } from '/src/utils/Debug';
import GUI from 'lil-gui';

export const gui = new GUI({
  title: 'My project debug',
});

// Only show when hash #debug is present in the URL
gui.show(Debug.enabled());
