Shader "iPhone/Hal's/EnvMapGlass+DIFFUSE+decal" { 

	Properties { 
	
	
	_DecalTex ("Decal (RGBA)", 2D) = "black"
	_EnvMap ("EnvMap", 2D) = "black" { TexGen SphereMap } 
	_MainTex ("Base (RGB)", 2D) = "white"
	
	} 

	SubShader { 
		
	SeparateSpecular On 
	
	Tags { 
		"Queue" = "Geometry+1"
		 "IgnoreProjector"="True"

	 }
	Lighting Off
	

 Pass {
      	
      	 BindChannels {
            Bind "Vertex", vertex
            Bind "normal", normal
            Bind "texcoord", texcoord0 // main uses 1st uv
            Bind "texcoord1", texcoord1  // decal uses 2nd uv
         }
         
      	 	 
		SetTexture [_MainTex] {
				combine texture
		}
	
         SetTexture [_DecalTex] {
         	combine texture lerp (texture) previous
         }
      }
      
 
 Pass { 
		
		Name "BASE" 
		ZWrite on 
		Blend One One 
		
		BindChannels { 
			Bind "Vertex", vertex 
			Bind "normal", normal 
			
		} 
		
		SetTexture [_EnvMap] {
			 	
			combine texture 
		} 
		
	} 
	
	
	
	} 

	Fallback "VertexLit"
}