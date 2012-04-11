// 
//  ThrowSwipeController.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-21.
//  Copyright 2011 fayju. All rights reserved.

/*
Throw swipe controller attached to the object that is controlled by swiping 


*/
// 
class ThrowSwipeController extends InteractiveGameObject{
	
	
		private var swipeTime:float = 0.0;
		private var stationaryTime:float = 0.0;
		private var dragLoc:Vector2 = Vector2(0,0);
		public var cameraTransform:Transform;
		public var swipeAvailable:boolean = false;
		private var lastSwipe:float = 0; 
		private var screenFactor:float = 1;
		private var ragDollController:RagDollController;
		
		
		
		//get the target 
		function Start():void{
 
			lastSwipe = Time.time;
 
			screenFactor = 1.0;//Screen.width * 1.0 / 800.0;
 			

			var components:Component[] = gameObject.GetComponentsInChildren(Rigidbody,true);
		 
			for(var c:Component in components){
				var go:GameObject = c.gameObject;
				var proxy:ProxyInteractiveObject = go.AddComponent(ProxyInteractiveObject);
				proxy.target = gameObject;
				
			}
			ragDollController = gameObject.GetComponent(RagDollController);
			
		}

		function onBeginTouch(io:InteractionObject):void{
		
			resetSwipe(io);
		}

		function onMoveTouch(io:InteractionObject):void{
		///update rotation
		Debug.Log("toss moved");
				var evt:ProxyTouch = io.evt;
		 		var deltaLoc:Vector2 =  evt.deltaPosition;
				var sw:float = Screen.width*1.0;
				var sh:float = Screen.height*1.0;
				//var explosionLoc:Vector3 = transform.position - 3*xVector*deltaLoc.x/sw - 3*axisVector*deltaLoc.y/sh + Vector3(0,-1,0);
	 
				var massFactor:float =(150 )*Time.deltaTime*50;
 
				stationaryTime = Time.time;
		}
		function onStationaryTouch(io:InteractionObject):void{
		 	if(Time.time - stationaryTime > 0.3){
				resetSwipe(io);
			}
			//updateRotation(io);
			Debug.Log("toss stationary");
		}
		function onEndTouch(io:InteractionObject):void{
		  	Debug.Log("toss finished");
			cleanUp(io);
		}
		function onCancelTouch(io:InteractionObject):void{
		 	Debug.Log("toss canceled");
			cleanUp(io);
		}
		function resetSwipe(io:InteractionObject):void{
			swipeTime = Time.time;
			var evt:ProxyTouch = io.evt;
			dragLoc.x= evt.position.x;
			dragLoc.y= evt.position.y;
		}
		function cleanUp(io:InteractionObject):void{
			///if(swipeAvailable ){
				if( Time.time - lastSwipe > 0.5 ){
		
				 //notify about swipe
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
					var yang:float = -(deltaLoc.y/sh)*20;
					
					var elevation:float = 20;//-20+yang;
					var quart:Quaternion = Quaternion.AngleAxis(elevation, xVector);
					launchVector = quart*launchVector;
					
					
					var xang:float = deltaLoc.x/sw*180;
					var maxAng:float = 60.0;
					xang =Mathf.Clamp(xang, -maxAng, maxAng);
					var yquart:Quaternion = Quaternion.AngleAxis(xang, upVector);
					launchVector = yquart*launchVector;
		
					launchVector = launchVector*500.0;
				
					if(ragDollController){
							ragDollController.throwMe(launchVector, io.target);
					}else{
							gameObject.SendMessage("throwMe", launchVector, SendMessageOptions.DontRequireReceiver);
					}
			
				 //	rigidbody.AddRelativeTorque(factor*massFactor*3000*deltaLoc.y/sh, factor*massFactor*3000*deltaLoc.x/sw, 0);//, [ForceMode mode = ForceMode.Force)
						lastSwipe = Time.time;
			
				}
	//		}
		}
		
}