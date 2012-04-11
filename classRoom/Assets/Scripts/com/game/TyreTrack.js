// 
//  TyreTrack.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-03-11.
//  Copyright 2011 fayju. All rights reserved.
// 

class TyreTrack extends MonoBehaviour{
	var drawElements:int = 30;
 
	var tyreWidth:float = 1;
	var maxdrawDistance:float = 2;
	
	private var currentDrawId:int = 0;
	
	
	
	private var meshRenderer:MeshRenderer;
	private var mesh:Mesh;
	private var meshFilter:MeshFilter;

	protected var upVect:Vector3 = Vector3(0,0,1);
	protected var xVect:Vector3 = Vector3(1,0,0);
	protected var yVect:Vector3 = Vector3(0,1,0);
	
	var segments:SegmentDefinition[];
 
	
	protected var displayVertices:Vector3[];
	protected var displayUV:Vector2[];
	protected var displaytriangles:int[];
	protected var normals:Vector3[];
	
	private var isInited:boolean;
	
	var material:Material;
	private var lastDrawLoc:Vector3;
	private var lastXvect:Vector3;

	private var resetLoc:boolean  = false;

	function init(startLoc:Vector3, xvect:Vector3):void{
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
		lastDrawLoc = startLoc;
		lastXvect = xvect;
		
		isInited = true;
		
		
	}

	function populateMesh():void{
		
		 	var blocks:int  = drawElements;

			var vertCount:int = blocks*4;
			var incr:int = 0;
			var cent:Vector3 = Vector3(0,0,0);
		 
			
			displayVertices = new Vector3[vertCount];
			var d:int = 0;
			var t:int = 0;
			displayUV = new Vector2[vertCount];
			var triangleCount:int = blocks*2*3;
			var displayTriangles:int[] = new int[triangleCount];
		normals = new Vector3[vertCount];
	
			
			segments = new SegmentDefinition[blocks];
			var uvQuad:TrackQuad = new TrackQuad();
			uvQuad.updateQuadFromUV(0,0,1,1);
			for( var i:int = 0; i < blocks; i++){
				
 
				segments[i] = new SegmentDefinition();
				
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
		 		var upVector:Vector3 = Vector3(0,1,0);
		 
				normals[d] =  upVector;
				normals[d + 1] = upVector;
				normals[d + 2] = upVector;
				normals[d + 3] = upVector;
				
				
				
				segments[i].A = A;
				segments[i].B = B;
				segments[i].C = C;
				segments[i].D = D;
				
				segments[i].normalids = new int[4];
				segments[i].normalids[0] = d;
				segments[i].normalids[1] = d + 1;
				segments[i].normalids[2] = d + 2;
				segments[i].normalids[3] = d + 3;
			
				d = d+4;
				
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
			 
			 		displayUV[A] = uvQuad.A;
					displayUV[B] = uvQuad.B;
					displayUV[C] = uvQuad.C;
					displayUV[D] = uvQuad.D;
				
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
	function closeDraw():void{
		if(!resetLoc){
			currentDrawId++;
			if(currentDrawId >= segments.length){
				currentDrawId = 0;
			}
			resetLoc = true;
		}
			
	}
	function updateVerts(loc:Vector3,xvect:Vector3):void{
		//don't do anything unless we have inited it 
		if(isInited){
			var currentSeg:SegmentDefinition = segments[currentDrawId];
			
			if(	resetLoc){
					lastXvect = xvect;
					lastDrawLoc = loc;
				resetLoc = false;
			}
			var driveDist:float = Vector4.Distance(loc, lastDrawLoc);
			
				displayVertices[currentSeg.C] = lastDrawLoc + lastXvect*tyreWidth/2.0;
				displayVertices[currentSeg.D] = lastDrawLoc - lastXvect*tyreWidth/2.0;
			
				displayVertices[currentSeg.A] = loc + xvect*tyreWidth/2.0;
				displayVertices[currentSeg.B] = loc - xvect*tyreWidth/2.0;
			if(driveDist > maxdrawDistance){
				//step up
				//update previous and step up
			
				
				lastXvect = xvect;
				lastDrawLoc = loc;
				currentDrawId++;
				if(currentDrawId >= segments.length){
					currentDrawId = 0;
				}
				
			}else{
				
			}
			
				mesh.vertices = displayVertices;
				mesh.RecalculateBounds();
		}else{
			init(loc,xvect);
		}
		
	}
	
}
class TrackQuad{
	//depends on winding
	var A:Vector2 = Vector2(0,0);
	var B:Vector2 = Vector2(0,0);
	var C:Vector2 = Vector2(0,0);
	var D:Vector2 = Vector2(0,0);
	var width:float = 0;
	var height:float= 0;
	/*
		A-----B
		|	  |
		|	  |
		C-----D
	*/
 
	function TrackQuad(){
		
	}
	function updateQuadFromUV(ax,ay,w,h):void{
		A.x = 0;
		A.y = 0;
		
		B.x =1;
		B.y =0;
		
		C.x = 0;
		C.y = 1;
		
		D.x = 1;
		D.y = 1; 
		
	 
		
	}
	function updateQuadFromRect(rt:Rect, textureSize:float):void{
		A.x = (rt.x  + rt.width)/textureSize;
		A.y =   (textureSize -(rt.y + rt.height))/textureSize;
		
		B.x = (rt.x)/textureSize;
		B.y =(textureSize -(rt.y + rt.height))/textureSize;
		
		C.x = (rt.x+ rt.width)/textureSize;
		C.y = (textureSize -rt.y)/textureSize;
		
		D.x = (rt.x )/textureSize;
		D.y = (textureSize -rt.y)/textureSize; 
		
		width = B.x - A.x;
		height = C.x - A.x;
		
	}
	
}

class SegmentDefinition {
		/*
		A-------B
		|		|
		|		|
		C-------D
		*/
		var normalids:int[];
		var A:int = 0;
		var B:int = 1;
		var C:int = 2;
		var D:int = 3;
 	

 

}