// 
//  IsolationObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-11-12.
//  Copyright 2010 fayju. All rights reserved.
// 

class IsolationObject{
	var target:GameObject;
	
	var isolationLayer:int;
	var formerLayerMask:int;
	
	function isolate(_target:GameObject, _isolationLayer:int):void{
		
		target = _target;
		
		isolationLayer = _isolationLayer;
		
		formerLayerMask = target.layer;
		
		var comp:Component[] = target.GetComponentsInChildren(Renderer, true);
		for(var c:Component in comp){
			var rend:Renderer = c as Renderer;
			var go:GameObject = rend.gameObject;
		go.layer = isolationLayer;
		}
	}
	function resetlayer():void{
		if(target != null){
			var comp:Component[] = target.GetComponentsInChildren(Renderer, true);
			for(var c:Component in comp){
				var rend:Renderer = c as Renderer;
				var go:GameObject = rend.gameObject;
			go.layer = formerLayerMask;
			}
		}
		 
	}
	function destroy():void{
		target = null;
	}
}
