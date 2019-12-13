

const float pi	 	= 3.14159;

// from iq
float expStep( float x, float k, float n )
{
  return exp( -k*pow(x,n) );
}

mat2 rot(float rads)
{
  float cos_rads = cos(rads);
  float sin_rads = sin(rads);

  return mat2(cos_rads, sin_rads, -sin_rads, cos_rads);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 p = (2. * fragCoord.xy - iResolution.xy) / iResolution.y;

  p = rot(iTime * 1.25) * p;
  p = vec2(p.x, -p.y) + .15;

  float r = length(p);
  float a = atan(p.y, p.x);
  a += 2. * sin(a);

  float coord = fract(a / pi + expStep(r, 1., 0.5) * 8. + 1.16 * iTime);
  vec3 col = mix(vec3(.1, 0., .5), vec3(.2, 0.2, .5), step(.6, coord));
//   vec3 col = mix(vec3(.0, 0., .0), vec3(.1, 0.1, .1), step(.6, coord));

  col *= pow(r, .65) * 1.85;
  fragColor.rgb = col;
}
