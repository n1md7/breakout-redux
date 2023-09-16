import { ParticleEmitter, vec2, Color, Vector2 } from 'littlejsengine/build/littlejs.esm';

export const Particles = {
  BallDestroy: (position: Vector2, color: Color) =>
    new ParticleEmitter(
      position,
      0, //position, angle
      0, // emitSize
      0.1, // emitTime
      500, // emitRate
      3.14, // emitConeAngle
      -1, // tileIndex
      vec2(8, 8), // tileSizeY
      color, // colorStartA
      color, // colorStartB
      color.scale(1, 0), // colorEndA
      color.scale(1, 0), // colorEndB
      0.2, // particleTime
      0.1, // sizeStart
      0.45, // sizeEnd
      0.1, // speed
      0.05, // angleSpeed
      0.98, // damping
      1, // angleDamping
      0, // gravityScale
      3.14, // particleConeAngle
      0.1, // fadeRate
      1, // randomness
      false, // collideTiles
      false, // additive
      true, // randomColorLinear
    ), // particle emitter
  BrickHit: (position: Vector2, color: Color) =>
    new ParticleEmitter(
      position,
      0, //position, angle
      0, // emitSize
      0.1, // emitTime
      50, // emitRate
      0.45, // emitConeAngle
      4, // tileIndex
      vec2(10, 10), // tileSizeY
      color, // colorStartA
      color, // colorStartB
      color.scale(1, 0), // colorEndA
      color.scale(1, 0), // colorEndB
      0.2, // particleTime
      0.1, // sizeStart
      0.45, // sizeEnd
      0.39, // speed
      0.05, // angleSpeed
      0.98, // damping
      1, // angleDamping
      0, // gravityScale
      1, // particleConeAngle
      0.1, // fadeRate
      0.99, // randomness
      true, // collideTiles
      true, // additive
      false, // randomColorLinear
    ), // particle emitter,
} as const;
