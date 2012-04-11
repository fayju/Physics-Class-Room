// 
//  TextModel.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-14.
//  Copyright 2010 fayju. All rights reserved.
// 
//text model if you just want ti take "sprites or letters from spritesheet for making models


class TextModel extends MeshObject{
 
 
var resourceGameObject:GameObject;
	function init( ):void{
		
		super.init();
		if(quadManager == null){
			var aname:String = resourceGameObject.name;
			Debug.Log("got any ");
	
		 
			quadManager = resourceGameObject.GetComponent(TextManager) as TextManager;
			Debug.Log("quad"+quadManager);
		}	
	}
	function DestroyObjects () {
		
		super.DestroyObjects();
	}
	
	function getSpaceWidth():float{
			var per:float =  quadManager.getSpacePercent();
			var f:float = per*quadManager.getDisplayWidth();
		return f;
	}
	function populateMesh():void{
		super.populateMesh();
	}
	function getLetterShift(l:String):float{
		
		var per:float =  quadManager.getLetterPercent(l);
		var aw:float = quadManager.getDisplayWidth();
		return -(1 - per)*aw*0.5;
	}
	function getWidth(l:String):float{
			var per:float =  quadManager.getLetterPercent(l);
			var f:float = per*quadManager.getDisplayWidth();
		return f;
	}
	function getHeight(l:String):float{
			return quadManager.getDisplayHeight();
	}
 
}