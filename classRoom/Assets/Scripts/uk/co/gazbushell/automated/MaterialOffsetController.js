// 
//  MaterialOffsetController.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-08-16.
//  Copyright 2010 fayju. All rights reserved.
// 

var materials:Material[];
var displace:Vector2[];
var offset:Vector2[];

private var isActive:boolean = false;
function Start(){
	if(materials.length == displace.length && materials.length == offset.length){
		isActive = true;
	}else{
		print("OFFSET CONTROLLER NOT CONFIGURED PROPERLY");
	}
}

function Update () {
	if(isActive){
		for(var i:int = 0; i< materials.length; i++){
			offset[i] =offset[i] +( Time.deltaTime *  displace[i]);
			 
			offset[i].x = offset[i].x > 1 ? offset[i].x - 1 : offset[i].x;
			offset[i].x = offset[i].x < 0 ? offset[i].x + 1 : offset[i].x;
			
			offset[i].y = offset[i].y > 1 ? offset[i].y - 1 : offset[i].y;
			offset[i].y = offset[i].y < 0 ? offset[i].y + 1 : offset[i].y;
		 
		    materials[i].mainTextureOffset =offset[i];
	    
		}
	}
   
}