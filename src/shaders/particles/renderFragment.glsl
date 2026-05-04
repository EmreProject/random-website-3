  precision highp float;


  layout(location = 0) out vec4 color;
  uniform sampler2D uParticleTexture;
  in float vEraseNonUsed;
  
  void main() {

      vec2 uv = gl_PointCoord;

      if(vEraseNonUsed==1.){
        discard;
      }

 

      //color = texture(uParticleTexture, uv);
     color=vec4(0.67,0.909,0.956,0.1);
    }