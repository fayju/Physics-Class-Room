Shader "iPhone/Hal's/EnvMapGlass+DIFFUSE" { 

	Properties { 
	_EnvMap ("EnvMap", 2D) = "black" { TexGen SphereMap } 
	_MainTex ("Base (RGB)", 2D) = "white" 
	
	} 

	SubShader { 
	SeparateSpecular On 
	
	// Tags {"Queue" = "Transparent" }
	Tags { "Queue" = "Geometry+1" }
	//Tags { "Queue" = "Geometry" }
	//Tags { "Queue" = "Overlay-1" }
	
	
	Lighting Off
	
	Pass { 
		SetTexture [_MainTex] {
				combine texture
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