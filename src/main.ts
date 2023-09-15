import * as Little from 'littlejsengine/build/littlejs.esm';

console.log(Little);
import env from './utils/Env';
// import { drawRect } from 'littlejsengine/build/littlejs.esm';

// drawRect(0, 0, 100, 100, 0xff0000);
console.info('Is development mode:', env.isDevelopment());
