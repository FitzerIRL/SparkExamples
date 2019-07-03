////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 		v_uv;

uniform vec2        u_resolution;
uniform vec4        u_mouse;

uniform float       u_time;
uniform sampler2D   s_texture;

#define iResolution u_resolution
#define iTime       u_time
#define iChannel0   s_texture

// #define fragCoord   gl_FragCoord
// #define fragColor   gl_FragColor
#define iMouse      u_mouse

#define texture     texture2D
#define textureLod  texture2D

void mainImage(out vec4, in vec2);
void main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Created by inigo quilez - iq/2015
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

void mainImage( out vec4 c, vec2 p )
{
    c.w = length(p = p/iResolution.y - .5);
    c   = texture( iChannel0, vec2(atan(p.y,p.x), .2/c.w)+iTime )*c.w;
}
