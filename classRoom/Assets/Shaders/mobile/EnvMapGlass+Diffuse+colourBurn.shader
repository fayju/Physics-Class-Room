Shader "iPhone/Hal's/EnvMapGlass+DIFFUSE+colourBurn" { 

Properties { 
   _EnvMap ("EnvMap", 2D) = "black" { TexGen SphereMap } 
   _MainTex ("Base (RGB)", 2D) = "white" 
   } 

SubShader { 
   SeparateSpecular On
  
	
	Pass { 
	SetTexture [_MainTex] {
				combine texture
		}
	}
	
      Pass { 
         Name "BASE" 
         ZWrite on 
         Blend DstColor SrcColor				//colourBurn
        // Blend DstColor Zero					//muil
         //Blend One One                       // additive
         //Blend One OneMinusSrcColor          // soft additive
         //Blend SrcAlpha OneMinusSrcAlpha     // real alpha blending
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