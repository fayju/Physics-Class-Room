// 
//  MeshObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-09-04.
//  Copyright 2010 fayju. All rights reserved.
// 
class MeshObject extends MonoBehaviour{
	private var meshRenderer:MeshRenderer;
	private var mesh:Mesh;
	private var meshFilter:MeshFilter;

	protected var upVect:Vector3 = Vector3(0,0,1);
	protected var xVect:Vector3 = Vector3(1,0,0);
	protected var yVect:Vector3 = Vector3(0,1,0);
	
	var letters:SpriteDefinition[];
	var quadManager:QuadManager;
	
	protected var displayVertices:Vector3[];
	protected var displayUV:Vector2[];
	protected var displaytriangles:int[];
	
	function init():void{
		if(gameObject.GetComponent(MeshRenderer) == null){
			meshRenderer =  gameObject.AddComponent(MeshRenderer);
		}else{
			meshRenderer =  gameObject.GetComponent(MeshRenderer);
		}
		if(gameObject.GetComponent(MeshFilter) == null){
			meshFilter =  gameObject.AddComponent(MeshFilter);
		}else{
			meshFilter =  gameObject.GetComponent(MeshFilter);
		}
	 
		
		mesh = new Mesh ();
		meshFilter.mesh = mesh;
	//	populateMesh();
	
	}
	function hasMesh ():boolean {
		return mesh != null;
	}
	
	function DestroyObjects () {
		if(quadManager)
			DestroyImmediate(quadManager);
		if(meshRenderer)
			DestroyImmediate(meshRenderer);
		if(meshFilter)
			DestroyImmediate(meshFilter);
	}
	function setMaterial(material:Material):void{
		meshRenderer.material = material;
	}
	function populateMesh():void{
		
		 	var blocks:int  = letters.length;

			var vertCount:int = blocks*4;
			var incr:int = 0;
			var cent:Vector3 = Vector3(0,0,0);

			displayVertices = new Vector3[vertCount];
			var d:int = 0;
			var t:int = 0;
			displayUV = new Vector2[vertCount];
			var triangleCount:int = blocks*2*3;
			var displayTriangles:int[] = new int[triangleCount];
			
			var normals:Vector3[] = new Vector3[vertCount];
				
				
			for( var i:int = 0; i < blocks; i++){
				
				var letter:SpriteDefinition = letters[i];
				if(letter.useLetterWidth){
					letter.aWidth  = quadManager.getDisplayWidth();
					letter.aHeight =  quadManager.getDisplayHeight();
				}
				
				letter.A = d;
				letter.B = d + 1;
				letter.C = d + 2;
			  	letter.D = d + 3;
				letter.isInited = true;
			 
				/*
				A-------B
				|		|
				|		|
				C-------D
				*/
			if(!letter.updateById){
						
				updateSpriteLetter(letter, false);
			
			}else{
				updateSpriteID(letter, false);
			 
			}
			updateSpritePosition(letter, false );
				normals[d] = letter.upVector;
				normals[d + 1] = letter.upVector;
				normals[d + 2] = letter.upVector;
				normals[d + 3] = letter.upVector;
				
				/*
				displayVertices[d] = rad +cent -perp - up;
				displayUV[d] = uvQuad.A;
				 
				displayVertices[d] = rad +cent +perp - up;
				displayUV[d] =  uvQuad.B;
			 
				displayVertices[d] = rad +cent -perp + up;
				displayUV[d] =  uvQuad.C;
				 
				displayVertices[d] = rad +cent +perp + up;
				displayUV[d] = uvQuad.D;
				*/
				d = d+4;
				
				displayTriangles[t] = letter.A; 
				t++;
				displayTriangles[t] = letter.B; 
				t++;
				displayTriangles[t] = letter.C; 
				t++;
				displayTriangles[t] = letter.C; 
				t++;
				displayTriangles[t] = letter.B; 
				t++;
				displayTriangles[t] = letter.D; 
				t++;
			 
				letter.isInited = true;
				
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
			meshFilter.mesh = mesh;
	}
	function updateSpriteLetter(letter:SpriteDefinition):void{
		updateSpriteLetter(letter, true);
	}
	function updateSpriteLetter(letter:SpriteDefinition, forceMeshUpdate:boolean):void{
	 
		if(letter.isInited){
		
			
				var uvQuad:UVQuad = quadManager.getLetterQuad(letter.letter);
				if(uvQuad != null){
				displayUV[letter.A] = uvQuad.A;
				displayUV[letter.B] = uvQuad.B;
				displayUV[letter.C] = uvQuad.C;
				displayUV[letter.D] = uvQuad.D;
				if(forceMeshUpdate){
					mesh.uv = displayUV;
				}
			}
		}
		
	}
	
	function updateSpriteID(letter:SpriteDefinition):void{
		updateSpriteID(letter, true);
	}
	function updateSpriteID(letter:SpriteDefinition, forceMeshUpdate:boolean):void{
	 
		if(letter.isInited){

				var uvQuad:UVQuad = quadManager.getIDQuad(letter.id);
				if(uvQuad != null){
					displayUV[letter.A] = uvQuad.A;
					displayUV[letter.B] = uvQuad.B;
					displayUV[letter.C] = uvQuad.C;
					displayUV[letter.D] = uvQuad.D;
					if(forceMeshUpdate){
						mesh.uv = displayUV;
					}
				}
		}
		
	}
	
	function updateSpritePosition(letter:SpriteDefinition):void{
		 updateSpritePosition(letter,true);
	}
	function updateSpritePosition(letter:SpriteDefinition, forceMeshUpdate:boolean):void{
		if(letter.isInited){

				displayVertices[letter.A] = letter.getAPos();
				displayVertices[letter.B] = letter.getBPos();
				displayVertices[letter.C] = letter.getCPos();
				displayVertices[letter.D] = letter.getDPos();
				if(forceMeshUpdate){
					mesh.vertices = displayVertices;
				}
		}
	}
	function createShapeSprite(id:int, pos:Vector3, scale:float, tWidth:float, tHeight:float):SpriteDefinition{
		var sd:SpriteDefinition = new SpriteDefinition();
		sd.id = id;
		sd.scale = scale;
		sd.position = pos;
		sd.aWidth = tWidth;
		sd.aHeight = tHeight;
		sd.updateById = true;
		sd.useLetterWidth = false;
		return sd;
	}
	function createLetterSprite(letter:String, pos:Vector3, scale:float):SpriteDefinition{
		var sd:SpriteDefinition = new SpriteDefinition();
		sd.letter = letter;
		sd.scale = scale;
		sd.position = pos;
		return sd;
	}
	
}
