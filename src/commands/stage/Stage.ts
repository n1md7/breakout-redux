export abstract class Stage {
  protected abstract readonly map: [string, string][];
  protected constructor() {}

  abstract start(): void;
  abstract getMap(): [string, string][];
}
