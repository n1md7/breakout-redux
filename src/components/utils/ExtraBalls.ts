import { Counter } from '/src/components/utils/Counter';

export class ExtraBalls extends Counter {
  runOut() {
    return !this.hasValue();
  }
}
