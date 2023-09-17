import * as L from 'littlejsengine/build/littlejs.esm';
import { Counter } from '/src/components/utils/Counter';

export class Strength extends Counter {
  constructor(initialValue: number) {
    super(initialValue);
  }

  static getColor(value: number) {
    if (value === 0) return new L.Color().setHex('#ffffff');
    if (value === 1) return new L.Color().setHex('#ffffff');
    if (value === 2) return new L.Color().setHex('#ffd0d0');
    if (value === 3) return new L.Color().setHex('#ffb0b0');
    if (value === 4) return new L.Color().setHex('#ff9090');
    if (value === 5) return new L.Color().setHex('#ff7070');
    if (value === 6) return new L.Color().setHex('#ff5050');
    if (value === 7) return new L.Color().setHex('#ff3030');
    if (value === 8) return new L.Color().setHex('#ff1010');

    return new L.Color().setHex('#ff0000');
  }

  getColor() {
    return Strength.getColor(this.value);
  }
}
