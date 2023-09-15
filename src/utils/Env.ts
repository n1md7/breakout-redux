import { Mode } from '/src/enums/mode';

export class Env {
  constructor(readonly mode: string) {}

  isDevelopment() {
    return this.mode === Mode.development;
  }

  isCrazyGames() {
    return this.mode === Mode.crazyGames;
  }

  isItchIo() {
    return this.mode === Mode.itchIo;
  }

  isGithubPages() {
    return this.mode === Mode.githubPages;
  }

  isUnitTest() {
    return this.mode === Mode.unitTest;
  }

  isE2ETest() {
    return this.mode === Mode.e2eTest;
  }
}

export default new Env(import.meta.env.MODE);
