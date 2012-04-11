// 
//  CameraFollowObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-02-20.
//  Copyright 2012 fayju. All rights reserved.
// 
class CameraFollowObject extends InteractiveGameObject{
 

	// The target we are following
	var target : Transform;

	protected var cameraTrans:Transform;
	
	protected var destinationLoc:Vector3;
	protected var destinationRotation:Quaternion;
	
	protected var difference:Vector3;
	protected var relativeLookPos:Vector3;
	//get initial relationship to camera and that is the one that you keep until it rotates
	protected var lerpSpeed  = 0.1;
	
	protected var captureRotation:Quaternion;
	protected var dragV:Vector2 = Vector2(0,0);
	protected var lastRotation:Vector2 = Vector2(0,0);
	protected var viewRotation:Vector2 = Vector2(0,30);
	protected var camDist:float = 20.0;
	
	protected var ignoreRotation:boolean = false;
	var minDist:float = 8;
	var maxDist:float = 25;
	function Start():void{
		//listen for camera changes
		cameraTrans = transform;
	 	difference = cameraTrans.position - target.position;
		var dist:float = difference.magnitude;
		relativeLookPos = - target.position + transform.position + transform.forward*dist;	 
		
		
		var lookLoc:Vector3 = target.position ;

	//destinationLoc = lookLoc+  Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0))*relativeLookPos;
	//destinationRotation = Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0));
	}
 
	function LateUpdate(){

		if (target){

			var delta:float = Definitions.GetInstance().GetTimeFactor();
			
			var rel:Vector3 =  Quaternion.AngleAxis(-viewRotation.y, Vector3(1,0,0))*Vector3(0,0,camDist);
			destinationLoc =target.position  + Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0))*rel;
			
			//	var upVector:Vector3 = Vector3(0,1,0)*camDist*0.1;
			var newLoc:Vector3 = Vector3.Lerp(cameraTrans.position ,  destinationLoc, lerpSpeed*delta);
			
			//var lookUp:Vector3 = -upVector*3;
			
		/*
			// Calculate the current rotation angles
		//	var wantedRotationAngle : float = target.eulerAngles.y;
			var wantedHeight : float = target.position.y + height;
		
		 	var currentRotationAngle : float = transform.eulerAngles.y;
			var currentHeight : float = transform.position.y;
			var currentDistance: float = Vector3.Distance(Vector3(transform.position.x, 0, transform.position.z), Vector3(target.position.x, 0, target.position.z));// 
			// Damp the rotation around the y-axis
		
		
		
		
			var dt : float = Time.deltaTime;
			currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, defaultRotationAngle, 6 * delta);//Time.GetMyDeltaTime());
	
			// Damp the height
			currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * dt);//Time.GetMyDeltaTime());
 
			var currentRotation : Quaternion = Quaternion.Euler (0, currentRotationAngle, 0);
		 currentDistance = currentDistance +(-currentDistance + distance)*0.1*delta;
			var pos : Vector3 = target.position - currentRotation * Vector3.forward * currentDistance;
	
		 */
	 newLoc.y = Mathf.Clamp(newLoc.y ,0.5, 12);
		//make 
		
	 	cameraTrans.position = newLoc ; 

		 // cameraTrans.LookAt (target.position + Quaternion.AngleAxis(viewRotation.y, Vector3(1,0,0))*(Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0)))*relativeLookPos, Vector3.up);
//var toV:Vector3 = -newLoc + target.position;

		cameraTrans.LookAt(target.position , Vector3(0,1,0));
		cameraTrans.RotateAround(cameraTrans.position,  cameraTrans.right, -15.0);
	//	cameraTrans.rotation = destinationRotation;//	captureRotation = cameraTrans.rotation; 
	 }

	}
	 function finishTouch(io:InteractionObject):void{
		
	}
	function onBeginTouch(io:InteractionObject):void{
		Debug.Log("begin cam swipe");
		var touchLoc:Vector2 = io.evt.position;
		dragV.x = touchLoc.x;
		dragV.y = touchLoc.y;
		lastRotation = viewRotation;
	}
	function updateRotation(io:InteractionObject):void{
		//if(!ignoreRotation){
				rotateX(io);
		//	}
	}

	function Update():void{
		/*	if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A) )
			        addXRotate(80*Time.deltaTime);
			
			if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D))
		        addXRotate(-80*Time.deltaTime);	*/
			ignoreRotation = false;
		
				#if UNITY_EDITOR
				var mdelta:float = -Input.GetAxis("Mouse ScrollWheel");
				camDist = Mathf.Clamp(camDist + mdelta, minDist, maxDist);
				ignoreRotation = true;
				#endif
				if (Input.touchCount >= 2)
				{
					var pinchDelta:float = 0;
				    var touch0:Vector2;
				 	var touch1:Vector2;
				    var distance:float;
				    touch0 = Input.GetTouch(0).position;
				    touch1 = Input.GetTouch(1).position;

				    pinchDelta = Vector2.Distance(touch0, touch1);
				
					camDist = Mathf.Clamp(camDist + pinchDelta, minDist, maxDist);
					ignoreRotation = true;
				}else{
					//don't allow other inputs
				}
	 
				
		//check zooming code	 
	}
	function addXRotate(deg:float):void{
		lastRotation.x = viewRotation.x;
		var rot:float;
			rot = deg;
			//	rot = rot;///screenFactor;
			viewRotation.x = lastRotation.x + rot;
	 
		if(viewRotation.x > 360){
			viewRotation.x = viewRotation.x - 360;
		}
		if(viewRotation.x < -360){
			viewRotation.x = viewRotation.x + 360;
		}
		
		
		var displacement:Vector3 = (-target.position + cameraTrans.position)*Vector2.Distance(Vector2(target.position.x, target.position.z), Vector2(cameraTrans.position.x, cameraTrans.position.z));
 		var lookLoc:Vector3 = target.position ;
	 
		cameraTrans.position = lookLoc+  Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0))*relativeLookPos;
		cameraTrans.LookAt(lookLoc, Vector3(0,1,0));
	}
	function rotateX(io:InteractionObject):void{	
				var touchLoc:Vector2 = io.evt.position;
				var diff:float = - dragV.x + touchLoc.x;
				var rot:float;
				var split:float = 1;//320/480.0; //FOR_MAC
				rot= split*(180.0/Screen.width)*diff;
				viewRotation.x = lastRotation.x + rot;
				if(viewRotation.x > 360){
					viewRotation.x = viewRotation.x - 360;
				}
				if(viewRotation.x < -360){
					viewRotation.x = viewRotation.x + 360;
				}
				
				
					var diffy:float = - dragV.y + touchLoc.y;
					var roty:float;
					
					roty= -split*(180.0/Screen.width)*diffy;
					
					viewRotation.y = lastRotation.y + roty;
					viewRotation.y = 	Mathf.Clamp(viewRotation.y, 5,80);
					if(viewRotation.y > 360){
						viewRotation.y = viewRotation.y - 360;
					}
					if(viewRotation.y < -360){
						viewRotation.y = viewRotation.y + 360;
					}
		
		 		var lookLoc:Vector3 = target.position ;
	 
			destinationLoc = lookLoc+   Quaternion.AngleAxis(viewRotation.y, Vector3(1,0,0))*Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0))*relativeLookPos;
			destinationRotation =  Quaternion.AngleAxis(viewRotation.y, Vector3(1,0,0))*Quaternion.AngleAxis(viewRotation.x, Vector3(0,1,0)) ;
	}
	function onMoveTouch(io:InteractionObject):void{
		///update rotation
		updateRotation(io);
	
	}
	function onStationaryTouch(io:InteractionObject):void{
	 
		updateRotation(io);
	}
	function onEndTouch(io:InteractionObject):void{
	  	updateRotation(io);
		finishTouch(io);
	}
	function onCancelTouch(io:InteractionObject):void{
	 	updateRotation(io);
	finishTouch(io);
	}
}

