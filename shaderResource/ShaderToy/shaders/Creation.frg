////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
#ifdef GL_ES
    precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

#define iResolution u_resolution
#define iTime       u_time
// #define fragCoord   gl_FragCoord
// #define fragColor   gl_FragColor
#define iMouse      vec4(0.,0.,0.,0.)

void mainImage(out vec4, in vec2);
void main(void) { mainImage(gl_FragColor, gl_FragCoord.xy); }
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'

#define t iTime
#define r iResolution.xy

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	vec3 c;
	float l,z=t;
	for(int i=0;i<3;i++) {
		vec2 uv,p=fragCoord.xy/r;
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z*2.));
		c[i]=.01/length(abs(mod(uv,1.)-.5));
	}
	fragColor=vec4(c/l,t);
}