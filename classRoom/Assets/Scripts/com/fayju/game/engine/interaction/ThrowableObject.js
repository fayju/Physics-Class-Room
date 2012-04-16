// 
//  ThrowableObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-02-20.
//  Copyright 2012 fayju. All rights reserved.
// 
class ThrowableObject extends InteractiveGameObject{
		public var cameraTransform:Transform;//get from main camera
		public var usePosition:boolean = false;
		private var touchPosition:Vector3;
	 	protected var objTransform:Transform;
		private var swipeTime:float = 0.0;
		private var stationaryTime:float = 0.0;
		private var dragLoc:Vector2 = Vector2(0,0);
	
		private var lastSwipe:float = 0; 
		private var screenFactor:float = 1;
		var power:float = 1.0;
	 
		protected var defaultRadius:float;
		protected var defaultDist:float;
		protected var sphereCol:SphereCollider;
		protected var queueForce:boolean = false;
 		/*var hasTrail:boolean = false;
		protected var trail:TyreTrack;
		var orbTrack:String = "_OrbTrack1";*/
		protected var throwDirection:Vector3;
		function Start():void{
			objTransform = transform;
 			cameraTransform =  Definitions.GetInstance().MainCamera().transform;
			lastSwipe = Time.time;
			screenFactor = Screen.width * 1.0 / 800.0;
				 /*
			 		if(orbTrack != "" && hasTrail){
						var tyre:GameObject = Instantiate(Resources.Load("_trails/"+orbTrack));
						trail  = tyre.GetComponent(TyreTrack);
						//myDrawWidth = tyreTrack.tyreWidth;
					 	//tyreTrack.tyreWidth =  myDrawWidth*trans.localScale.x;
					 	//tyreTrack.maxdrawDistance =  tyreTrack.maxdrawDistance*scalar;
						//hasTrail = true;
					}
				 */
		}
		function performLateUpdate():void{
			
			var dist:float = Vector3.Distance(cameraTransform.position, transform.position );
			var minRad:float = 3;
			var maxRad:float = 50;
			sphereCol.radius = Mathf.Clamp((defaultRadius)*dist/defaultDist, minRad, maxRad);
			
		}
		function onBeginTouch(io:InteractionObject):void{
		
			io.useCollider = false;
			touchPosition = io.touchPosition;
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
				resetSwipe(io); //is it still within
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
		function throwObject(v:Vector3){
			var rb:Rigidbody = gameObject.rigidbody;
			
			if(!rb){
				rb = transform.parent.rigidbody;
			}
			if(rb){
				rb.isKinematic = false;
				queueForce = true;
				throwDirection = v;
				Debug.Log("thrown at "+v);
				if(usePosition){
					rb.AddForceAtPosition(v * 100*rb.mass*power, touchPosition);
			
				}else{
					rb.AddForce (v * 100*rb.mass*power);
				}
			 
			}
		}
	
		
		function cleanUp(io:InteractionObject):void{		 
			if( Time.time - lastSwipe > 0.5 ){
					var evt:ProxyTouch = io.evt;
					var diffX:float = -dragLoc.x + evt.position.x;
					var diffY:float  = -dragLoc.y + evt.position.y;
					var cmfw = cameraTransform.forward;
				 	cmfw.y = 1;
					cmfw.y = 0;
					
					 
				 	var timePassed:float =(Time.time - swipeTime)/0.5;
				timePassed = Mathf.Clamp(timePassed, 0,1);
						 var screenFactor:float = 1;
						if(Screen.height == 320 || Screen.height == 480){
							//small screen
							screenFactor = 1;
						}
						if(Screen.height == 960 || Screen.height == 640){
							//small screen
							screenFactor = 1;
						}
						if(Screen.height == 1024 || Screen.height == 768){
							//small screen
							screenFactor = 2; 
						}
				 	//var timeFactor:float =   timePassed;
						var xVector:Vector3 = cameraTransform.right;
						var axisVector:Vector3 = cameraTransform.forward;
						var upVector:Vector3 = cameraTransform.up;

						var deltaLoc:Vector2 = -dragLoc + evt.position;
						var sw:float = Screen.width*1.0;
						var sh:float = Screen.height*1.0;

						var launchVector:Vector3 = axisVector;
						
							var xang:float = screenFactor*(deltaLoc.x/sw)*180;
							var maxAng:float = 60.0;
							xang =Mathf.Clamp(xang, -maxAng, maxAng);
						
						var yang:float = -screenFactor*(deltaLoc.y/sh)*40;
						var elevation:float;
						if(yang < 0){
							elevation =  -20 + yang*timePassed;
						}else{
							elevation =  0.75*(20 + yang*timePassed) + 180;
							xang = -xang;
						}
						var quart:Quaternion = Quaternion.AngleAxis(elevation, xVector);
						launchVector = quart*launchVector;

						var factor:float  = screenFactor*deltaLoc.magnitude/(Screen.height);
						factor = 0.5 + Mathf.Clamp(factor, 0, 1);
					
						var yquart:Quaternion = Quaternion.AngleAxis(xang, upVector);
						launchVector = yquart*launchVector;

					 
					throwObject(launchVector*factor*10.0);
					
				/*	if(diffY/Screen.height < 0){
					throwObject(cmfw*( diffY/Screen.height)*8.0 +  ((3.0*diffX/Screen.width)*cameraTransform.right - (diffY/Screen.height)*1.75*cameraTransform.up )*10);	
					}else{
					throwObject(cmfw*( diffY/Screen.height)*10.0 +  ((3.0*diffX/Screen.width)*cameraTransform.right + (diffY/Screen.height)*2.2*cameraTransform.up )*10);	
					}*/
			}
			lastSwipe = Time.time;
		}
}