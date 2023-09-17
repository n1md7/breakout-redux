import * as L from 'littlejsengine/build/littlejs.esm';

export class Strength {
  private readonly MIN = 0;
  private readonly MAX = 9;

  private value: number;
  constructor(private readonly initialValue: number) {
    this.value = this.apply(initialValue);
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

  decrement() {
    this.value = this.apply(--this.value);
  }

  increment() {
    this.value = this.apply(++this.value);
  }

  restore() {
    this.value = this.initialValue;
  }

  add(value: number) {
    this.value += value;
    this.value = this.apply(this.value);
  }

  sub(value: number) {
    this.value -= value;
    this.value = this.apply(this.value);
  }

  getValue() {
    return this.value;
  }

  hasValue() {
    return this.value > 0;
  }

  getColor() {
    return Strength.getColor(this.value);
  }

  private apply(value: number) {
    return Math.min(Math.max(value, this.MIN), this.MAX);
  }
}
