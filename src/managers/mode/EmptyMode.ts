import { Mode } from '/src/managers/mode/Mode';

export class EmptyMode extends Mode {
  public readonly displayName = 'Empty';

  apply(): void {}
}
