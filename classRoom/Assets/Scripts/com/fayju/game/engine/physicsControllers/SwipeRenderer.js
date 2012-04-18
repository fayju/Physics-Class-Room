// 
//  SwipeRenderer.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-22.
//  Copyright 2011 fayju. All rights reserved.
// 

/*
renders the track of the swipe 
*/
// 
class SwipeRenderer extends MonoBehaviour{
	
	
		private var swipeTime:float = 0.0;
		private var stationaryTime:float = 0.0;
		private var dragLoc:Vector2 = Vector2(0,0);
		public var cameraTransform:Transform;
		public var swipeAvailable:boolean = false;
		private var lastSwipe:float = 0; 
		private var screenFactor:float = 1;

		function Start():void{
 
			lastSwipe = Time.time;
 
			screenFactor = Screen.width * 1.0 / 800.0;
 
		}

		function onBeginTouch(io:InteractionObject):void{
			//Debug.Log("swipe started "+Random.Range(0,99999));
			resetSwipe(io);
		}

		function onMoveTouch(io:InteractionObject):void{
		///update rotation
				var evt:ProxyTouch = io.evt;
		 		var deltaLoc:Vector2 =  evt.deltaPosition;
				var sw:float = Screen.width*1.0;
				var sh:float = Screen.height*1.0;
				stationaryTime = Time.time;
		}
		function onStationaryTouch(io:InteractionObject):void{
		 	if(Time.time - stationaryTime > 0.3){
				resetSwipe(io);
			}
			//updateRotation(io);
			Debug.Log("swipe stationary");
		}
		function onEndTouch(io:InteractionObject):void{
		  	Debug.Log("swipe finished");
			cleanUp(io);
		}
		function onCancelTouch(io:InteractionObject):void{
		 	Debug.Log("swipe canceled");
			cleanUp(io);
		}
		function resetSwipe(io:InteractionObject):void{
			swipeTime = Time.time;
			var evt:ProxyTouch = io.evt;
			dragLoc.x= evt.position.x;
			dragLoc.y= evt.position.y;
		}
		function cleanUp(io:InteractionObject):void{
			if(swipeAvailable ){
				if( Time.time - lastSwipe > 0.5 ){
		
	/*			 //notify about swipe
					var evt:ProxyTouch = io.evt;
					var timePassed:float =(Time.time - swipeTime)/0.5;
					timePassed = timePassed > 1 ? 1 : timePassed;
					var factor:float = 1 - timePassed;
					var xVector:Vector3 = cameraTransform.right;
					var axisVector:Vector3 = cameraTransform.forward;
					var upVector:Vector3 = cameraTransform.up;
		
					var deltaLoc:Vector2 = -dragLoc + evt.position;
					var sw:float = Screen.width*1.0;
					var sh:float = Screen.height*1.0;
			
				var launchVector:Vector3 = axisVector;
		
					var yang:float = -deltaLoc.y/sh*30;
				var quart:Quaternion = Quaternion.AngleAxis(-30+yang, xVector);
				launchVector = quart*launchVector;
				var xang:float = deltaLoc.x/sw*180;
				var maxAng:float = 60.0;
				xang = xang > maxAng ? maxAng  : xang < -maxAng ? -maxAng :xang;
				var yquart:Quaternion = Quaternion.AngleAxis(xang, upVector);
				launchVector = yquart*launchVector;
		
				launchVector = launchVector*500.0;
		 
		
		 
		
 
						gameObject.SendMessage("throwMe", launchVector);
				 //	rigidbody.AddRelativeTorque(factor*massFactor*3000*deltaLoc.y/sh, factor*massFactor*3000*deltaLoc.x/sw, 0);//, [ForceMode mode = ForceMode.Force)
						lastSwipe = Time.time;
						*/
			
				}
			}
		}
		
}