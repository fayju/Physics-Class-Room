// 
//  InteractiveGameObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-13.
//  Copyright 2010 fayju. All rights reserved.
// 
class InteractiveGameObject extends MonoBehaviour{
	/*
	This is more of an interface really 
	*/
	function Start():void{

	}
	// =====================
	// = INTERACTION STUFF =
	// =====================
	function grabThisObject(rayCastManager:GameObject):void{
 	 
		rayCastManager.SendMessage("performPickUp", gameObject);
		//inform people
	}
	function onBeginTouch(io:InteractionObject):void{
 
	}
	function onMoveTouch(io:InteractionObject):void{
	
	}
	function onLostTouch(io:InteractionObject):void{
	
	}
	function onStationaryTouch(io:InteractionObject):void{
	
	}
	function onEndTouch(io:InteractionObject):void{
		//open a url
	}	
	function onCancelTouch(io:InteractionObject):void{
	 
	}
	// =====================
	// = INTERACTION STUFF =
	// =====================
}