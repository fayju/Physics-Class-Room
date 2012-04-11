// 
//  interactionObject.js
//  Assets its to store interaction data 
//  
//  Created by Gareth Bushell on 2010-07-12.
//  Copyright 2010 fayju. All rights reserved
//  

// 
class InteractionObject{
	var fingerId:int = 0;
	var target:GameObject;
	var grabTime:float;
	var evt:ProxyTouch;
	var touchPosition:Vector3;
	var touchNormal:Vector3;
	
	var isFinished:boolean = false;
	var useCollider:boolean = true;
	var coll:Collider;
	var fixedLocation:boolean = false;// if event will only end on touch events
	function createIO(fId:int, _target:GameObject){
		coll = _target.collider;
		target = _target;
		fingerId = fId;
		grabTime = Time.time;
		
	}
	function beginTouch(_evt:ProxyTouch):void{
		
	//begin has already been handles by the object when it recieved grabThisObject but i call it any way
		evt = _evt;
		target.SendMessage("onBeginTouch",this, SendMessageOptions.DontRequireReceiver);
	}
	function lostTouch(_evt:ProxyTouch):void{
			evt = _evt;
			//
			//isFinished = true;
			target.SendMessage("onLostTouch",this, SendMessageOptions.DontRequireReceiver);
	}
	function moveTouch(_evt:ProxyTouch ):void{
		evt = _evt;
		//
		
		target.SendMessage("onMoveTouch",this, SendMessageOptions.DontRequireReceiver);	
		 
	}
	function stationaryTouch(_evt:ProxyTouch):void{
		evt = _evt;
		target.SendMessage("onStationaryTouch",this, SendMessageOptions.DontRequireReceiver);	
	}
	function endTouch(_evt:ProxyTouch):void{
		evt = _evt;
		
		target.SendMessage("onEndTouch",this, SendMessageOptions.DontRequireReceiver);	
	}
	function cancelTouch(_evt:ProxyTouch):void{
		evt = _evt;
		target.SendMessage("onCancelTouch",this, SendMessageOptions.DontRequireReceiver);	
	}
	function clearUpTouch():void{
			target.SendMessage("onClearUpTouch",this, SendMessageOptions.DontRequireReceiver);	
	}
	
}