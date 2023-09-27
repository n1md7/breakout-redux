float hash(vec2 p) {
  p=fract(p*.3197);
  return fract(1.+sin(51.*p.x+73.*p.y)*13753.3);
}

float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1, 0)), u.x), mix(hash(i+vec2(0, 1)), hash(i+1.), u.x), u.y);
}

void mainImage(out vec4 c, vec2 p) {
  p /= iResolution.xy;

  // apply fuzz as horizontal offset
  const float fuzz = .001;
  const float fuzzScale = 800.;
  p.x += fuzz*(noise(vec2(p.y*fuzzScale, iTime*9.))*2.-1.);

  // init output color
  c = texture2D(iChannel0, p);

  // chromatic aberration
  const float chromatic = .003;
  c.r = texture2D(iChannel0, p - vec2(chromatic, 0)).r;
  c.b = texture2D(iChannel0, p + vec2(chromatic, 0)).b;

  // tv static noise
  const float staticNoise = .1;
  c += staticNoise * hash(vec2(p + mod(iTime, 1e3)));

  // scan lines
  const float scanlineScale = 800.;
  const float scanlineAlpha = .1;
  c *= 1. + scanlineAlpha*sin(p.y*scanlineScale);

  // black vignette around the outside
  const float vignette = 2.;
  float dx = 2.*p.x - 1., dy = 2.*p.y - 1.;
  c *= 1.-pow((dx*dx + dy*dy)/vignette, 6.);
}
