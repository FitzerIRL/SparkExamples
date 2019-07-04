
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;

    vec4 waterColor = vec4(1.0);
    float reflactionY = 0.46;
    if(uv.y <= reflactionY)
    {
        float oy = uv.y;
        uv.y = 2.0*reflactionY - uv.y;
        //uv.x = uv.x - ((uv.x-0.5)*0.2) * (1.0-oy/reflactionY);
        uv.y = uv.y + sin(1./(oy-reflactionY)+iTime*5.0)*0.003;
        waterColor = vec4(0.7,0.85, 1.0,1.0);
    }

    fragColor = texture(iChannel0, uv) * waterColor;
}

