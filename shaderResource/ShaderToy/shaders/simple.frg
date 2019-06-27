////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
#ifdef GL_ES
    precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec4        u_mouse;

uniform float       u_time;
uniform sampler2D   s_noise;

#define iResolution u_resolution
#define iTime       u_time
#define iChannel0   s_noise

// #define fragCoord   gl_FragCoord
// #define fragColor   gl_FragColor
#define iMouse      u_mouse

void mainImage(out vec4, in vec2);
void main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec4 px = texture2D(s_noise, v_uv);

	fragColor = px + vec4(v_uv.x, v_uv.y, 0.2, 0.015);
}