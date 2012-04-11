// 
//  SpriteDefinition.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-03-26.
//  Copyright 2011 fayju. All rights reserved.
// 
class SpriteDefinition {
		/*
		A-------B
		|		|
		|		|
		C-------D
		*/
	var A:int =0;
	var B:int =   1;
	var C:int =   2;
	var D:int =   3;
	var letter:String = "a";
	var id:int = 0;
	var updateById:boolean = false;
	var scale:float = 1;
	var position:Vector3  = Vector3(0,0,0);//a local position, registers the center of the sprite/face
	var upVector:Vector3 = Vector3(0,0,1);
	var xVector:Vector3 = Vector3(1,0,0);
	var yVector:Vector3 = Vector3(0,1,0);
	
	var aWidth:float = 0;
	var aHeight:float = 0;
	var isInited:boolean = false;
	var useLetterWidth:boolean = true;
	
	function getAPos():Vector3{
		return (position - xVector*aWidth*scale*0.5 -   yVector*aHeight*scale*0.5);
	}
	function getBPos():Vector3{
		return (position + xVector*aWidth*scale*0.5 -   yVector*aHeight*scale*0.5);
	}
	function getCPos():Vector3{
		return (position - xVector*aWidth*scale*0.5 +   yVector*aHeight*scale*0.5);
	}
	function getDPos():Vector3{
		return (position + xVector*aWidth*scale*0.5 +   yVector*aHeight*scale*0.5);
	}

}