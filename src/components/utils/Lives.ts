import { Counter } from '/src/components/utils/Counter';

export class Lives extends Counter {
  runOut() {
    return !this.hasValue();
  }
}
