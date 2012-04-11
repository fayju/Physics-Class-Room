// 
//  MeshGenerator.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-09-04.
//  Copyright 2010 fayju. All rights reserved.

//this object is to be commanded to draw some mesh but it will make a limited number of game objects with 
// 
class MeshGenerator extends MonoBehaviour{
	
	private var maxGameObjects:int = 100;
	private var maxPolys:int = 20;
	
	private var meshObjects:MeshObject[];
	private var pen:PenObject;
	
	function MeshGenerator(){
	
		
	}
	// =======================================================
	// = ***************** default functions ****************=
	// =========================================++++++++++++++
	function start():void{
			print("generated");
			meshObjects = new MeshObject[maxGameObjects];
			//make all the game Objects assign their verts then turn them off 
			for(var i:int = 0; i< maxGameObjects; i++){
				var go:GameObject = new GameObject("meshObject");
				meshObjects[i] = go.AddComponent("MeshObject");
				meshObjects[i].init();
			}
		//	make

			// then make a pen object that deforms each one inturn until finished with	
	}	
	function update():void{
		
	}
	function fixedUpdate():void{
		
	}
	function lateUpdate():void{
		
	}
 // ======================================================
 // = ******************* default functions ************ =
 // ======================================================
}