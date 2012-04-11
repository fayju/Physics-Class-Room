// 
//  QuadManager.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-15.
//  Copyright 2010 fayju. All rights reserved.
// 
class QuadManager extends MonoBehaviour{
	var textureSize:float = 512;
	var letterWidth:float = 50;
	var letterHeight:float = 73;
	var cols:int = 10;
	var rows:int = 7;
	var worldScale:float = 0.005;
	protected var madeRects:boolean =false;	
	protected var uvQuads:UVQuad[];
	
	function Start():void{
	
	}
	function getDisplayWidth():float{
			return letterWidth*worldScale;
	}
	function getDisplayHeight():float{
			return letterHeight*worldScale;
	}
	function getWidth():float{
		return letterWidth;
	}
	function getHeight():float {
			return letterHeight;
		
	}

	function getLetterQuad(str:String):UVQuad{//one char

	}
	function getIDQuad(i:int):UVQuad{
		forceUVRects();
		if(i >= uvQuads.length){
			i = 0;
		}
		return uvQuads[i];
	}
	function forceUVRects():void{
			if(!madeRects){
				MakeUVRects();
			}
	}
	///overrides
	function MakeUVRects():void{
		 
	}
	function getLetterPercent(str:String):float{
	}
	function getSpacePercent():float{
		
	}
	
}
class UVQuad{
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
 
	function UVQuad(){
		
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