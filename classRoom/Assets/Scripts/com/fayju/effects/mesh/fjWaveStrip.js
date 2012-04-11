// 
//  fjWaveStrip.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-02-22.
//  Copyright 2012 fayju. All rights reserved.
// 


class fjWaveStrip extends MonoBehaviour{
	private var meshRenderer:MeshRenderer;
	private var mesh:Mesh;
	private var meshFilter:MeshFilter;
	
	
	protected var displayVertices:Vector3[];
	protected var displayUV:Vector2[];
	protected var displaytriangles:int[];
	protected var normals:Vector3[];
	
 	var material:Material;
	
	var drawElements:int = 10;
	var xVect:Vector3 = Vector3(1,0,0);
	var zVect:Vector3 = Vector3(0,0,1);
	var upVector:Vector3 = Vector3(0,1,0);
	var drawWidth:float = 0.2;
	var gap:float = 0.2;
	
	
	var sinH:float = 0;
	function Start(){
		
			if(gameObject.GetComponent("MeshRenderer") == null){
				meshRenderer =  gameObject.AddComponent("MeshRenderer");
			}else{
					meshRenderer =  gameObject.GetComponent("MeshRenderer");
			}
			if(gameObject.GetComponent("MeshFilter") == null){
				meshFilter =  gameObject.AddComponent("MeshFilter");
			}else{
				meshFilter =  gameObject.GetComponent("MeshFilter");
			}


			mesh = new Mesh ();
		 	populateMesh();
		
			UpdateCenter.DefaultCenter().addUpdateObject(gameObject);
		
	}
	function performUpdate(){
		sinH = sinH + Time.deltaTime*100.0;
		if(sinH > 360.0){
			sinH = sinH -360.0;
		}
		var d:int = 0;
		for(var i:int = 0; i < displayVertices.length; i++){
			d = Mathf.Floor(i/2.0);
			displayVertices[i].y = d*0.01*Mathf.Sin((sinH + displayVertices[i].z*540*d)*Mathf.Deg2Rad);
			
		}
			mesh.vertices = displayVertices;
	}
	function populateMesh():void{
		
		 	var blocks:int  = drawElements;

			var vertCount:int = blocks*2 + 2;
			var incr:int = 0;
			var cent:Vector3 = Vector3(0,0,0);
		 
			
			displayVertices = new Vector3[vertCount];
			var d:int = 0;
			var t:int = 0;
			displayUV = new Vector2[vertCount];
			var triangleCount:int = (vertCount - 2)*3;
			var displayTriangles:int[] = new int[triangleCount];
			normals = new Vector3[vertCount];
	
			
		 
		//	var uvQuad:TrackQuad = new TrackQuad();
		//	uvQuad.updateQuadFromUV(0,0,1,1);
			for( var i:int = 0; i < blocks; i++){
				
  
				
				var A:int = d;
				var B:int = d + 1;
				var C:int = d + 2;
			  	var D:int = d + 3;
			 
			 
				/*
				A-------B
				|		|
				|		|
				C-------D
				*/
		 		
		 
				normals[d] =  upVector;
				normals[d + 1] = upVector;
				normals[d + 2] = upVector;
				normals[d + 3] = upVector;
			
			
				displayVertices[d] =  cent - xVect*drawWidth/2.0 + zVect*i*gap;
				displayVertices[d + 1] = cent + xVect*drawWidth/2.0 + zVect*i*gap;
				displayVertices[d + 2] = cent - xVect*drawWidth/2.0 + zVect*(i + 1)*gap;
				displayVertices[d + 3] = cent + xVect*drawWidth/2.0 + zVect*(i + 1)*gap;
				 Debug.Log("A "+A+" B "+B+" C "+C+" D "+D);
				
				displayTriangles[t] = B; 
				t++;                  
				displayTriangles[t] = A; 
				t++;                  
				displayTriangles[t] = D; 
				t++;                  
				displayTriangles[t] = D; 
				t++;                  
				displayTriangles[t] = A; 
				t++;                  
				displayTriangles[t] = C; 
				t++;
			 var uvdist:float = i/blocks;
			 		displayUV[A] = Vector2(0,uvdist);
					displayUV[B] = Vector2(1,uvdist);
					displayUV[C] = Vector2(0,1);
					displayUV[D] = Vector2(1,1);
					
					d = d +2;
					
				
			}
		 
			var colors:Color[] = new Color[vertCount];
			for(i= 0; i < vertCount; i++){
					colors[i] = Color.white;
			}
			if(mesh == null){
					mesh = new Mesh ();
			}
			mesh.Clear();
			mesh.vertices = displayVertices;
			mesh.uv = displayUV;
			mesh.triangles = displayTriangles;
			mesh.normals = normals;
			mesh.colors = colors;
			mesh.RecalculateBounds();
			
			if(material != null){
				meshRenderer.material = material;
			}
				meshFilter.mesh = mesh;
	}

	
}
 