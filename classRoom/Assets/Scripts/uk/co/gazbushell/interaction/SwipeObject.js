// 
//  SwipeObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-29.
//  Copyright 2010 fayju. All rights reserved.
// 
class SwipeObject extends InteractionObject{
 //send  swipes to thumbslider 

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
	//	isFinished = true;
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