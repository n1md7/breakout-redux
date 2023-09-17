import { EnvMode } from '/src/enums/mode';

export class Env {
  constructor(readonly mode: string) {}

  isDevelopment() {
    return this.mode === EnvMode.development;
  }

  isCrazyGames() {
    return this.mode === EnvMode.crazyGames;
  }

  isItchIo() {
    return this.mode === EnvMode.itchIo;
  }

  isGithubPages() {
    return this.mode === EnvMode.githubPages;
  }

  isUnitTest() {
    return this.mode === EnvMode.unitTest;
  }

  isE2ETest() {
    return this.mode === EnvMode.e2eTest;
  }
}

export default new Env(import.meta.env.MODE);
