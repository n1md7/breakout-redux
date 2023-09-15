import * as L from 'littlejsengine/build/littlejs.esm';

export class Wall extends L.EngineObject {
  constructor(position: L.Vector2, size: L.Vector2) {
    super(position, size);

    this.setCollision(true);
    this.mass = 0; // Static object
  }
}
