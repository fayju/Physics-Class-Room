// 
//  ProxyInteractiveObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-22.
//  Copyright 2011 fayju. All rights reserved.
// 
class ProxyInteractiveObject extends InteractiveGameObject{
	var target:GameObject;
	var targetInteractiveGameObject:InteractiveGameObject;
	function grabThisObject(rayCastManager:GameObject):void{
 		//print("hello");
		targetInteractiveGameObject = target.GetComponent(InteractiveGameObject) as InteractiveGameObject;
		rayCastManager.SendMessage("performPickUp", gameObject);
		
		//inform people
	}
	function onBeginTouch(io:InteractionObject):void{
		
 			if(targetInteractiveGameObject){
				targetInteractiveGameObject.onBeginTouch(io);
			}
	}
	function onMoveTouch(io:InteractionObject):void{
		Debug.Log(targetInteractiveGameObject+" here");
			if(targetInteractiveGameObject){
				targetInteractiveGameObject.onMoveTouch(io);
			}
	}
	function onLostTouch(io:InteractionObject):void{
			if(targetInteractiveGameObject){
				targetInteractiveGameObject.onMoveTouch(io);
			}
	}
	function onStationaryTouch(io:InteractionObject):void{
			if(targetInteractiveGameObject){
				targetInteractiveGameObject.onLostTouch(io);
			}
	}
	function onEndTouch(io:InteractionObject):void{
			if(targetInteractiveGameObject){
				targetInteractiveGameObject.onEndTouch(io);
			}
	}	
	function onCancelTouch(io:InteractionObject):void{
	 		if(targetInteractiveGameObject){
				targetInteractiveGameObject.onCancelTouch(io);
			}
	}
	
}