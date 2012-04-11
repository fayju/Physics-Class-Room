// 
//  MeshManager.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-09-04.
//  Copyright 2010 fayju. All rights reserved.
// 
var meshGenerator:MeshGenerator;

function Start():void{
	
	
	var generator:GameObject = new GameObject("MeshGenerator");
	meshGenerator = generator.AddComponent("MeshGenerator");
	meshGenerator.start();
	
}
function Update():void{
		meshGenerator.update();
}
function FixedUpdate():void{
		meshGenerator.fixedUpdate();
}
function LateUpdate():void{
		meshGenerator.lateUpdate();
}
	


