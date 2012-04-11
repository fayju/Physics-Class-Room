// 
//  RayCastManager.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-07-12.
//  Copyright 2010 fayju. All rights reserved.
// 
//needs to have a reference to the camera 
// picks into the screen and sends interaction information into it

class RayCastManager extends MonoBehaviour{

	var interactionObjects:Array = new Array();
	
	var particleGroup:String[];
	var dragObject:GameObject;
	private var currentTouch:ProxyTouch;
	var layerMask = 0;
	var hitPosition:Vector3 = Vector3(0,0,0);
	var hitNormal:Vector3 = Vector3(0,1,0);
	var useScreenSwipes:boolean = true;
	var swipeController:GameObject;
	private var swipeOverride:GameObject;
	private var swipeOverridden:boolean = false;
	function Start():void{
		particleGroup = new String[2];
		particleGroup[0] = "";
		particleGroup[1] = "";
	}
	function updateTouch():ProxyTouch[]{
		var theTouches:ProxyTouch[] = ProxyTouchManager.DefaultManager().touches();////Input.touches;
		return  updateTouch(theTouches);
	}
	function updateTouch(theTouches:ProxyTouch[]):ProxyTouch[]{
	
	
	
			
			
			var i:int;
			var numberActiveTouches:int;
			var c:int = 0;
			var io:InteractionObject;
			var activeTouches:int = theTouches.length;
			switch(activeTouches){
				case 0:
				//send event to end all touches
					numberActiveTouches =  interactionObjects.length;
					c = 0;
					for(i = 0; i < numberActiveTouches; i++){
						io  = interactionObjects[c] as InteractionObject;
				 
							//call completion()
							//if it has missed it
							io.clearUpTouch();
							interactionObjects.RemoveAt(c);
				 
					}
					//return activeTouches;
				break;
				default:
				
				break;

			}
	
			var availableSlots:HashArray = new HashArray();
			if(activeTouches > 0){
			
			 for (var evt : ProxyTouch in  theTouches){ 
				var makeHit:boolean = false;
				switch(evt.phase){
					case ProxyTouchPhase.Began://grab or begin touch of something
							//check for blank spot screen areas first
							//eg temporary reset scenen bottom left
						 makeHit = rayGrabItem(evt);//this is for picking up or detecting to pick up objects
					
					 
					break;
					case ProxyTouchPhase.Moved:
					//check agains finger id 
					var isIObject:boolean = false;
					
						for(i = 0; i < interactionObjects.length; i++){
							io  = interactionObjects[i] as InteractionObject;
							if(io.fingerId == evt.fingerId){
								//move this object
								isIObject = true;
								if(io.useCollider){
									if(checkItem(evt, io)){
										io.moveTouch(evt);
									}else{
									//Debug.Log("lost the touch "+Random.Range(0,99999));
										io.lostTouch(evt);	
									}
								}else{
									io.moveTouch(evt);
								}
								makeHit = true;
							}
						}
						
						if(!isIObject && ( useScreenSwipes || swipeOverridden)){
							//checks for a swipe if it has moved 
							makeSwipeObject( evt);
							makeHit = true;
						}
					break;
					case ProxyTouchPhase.Stationary:
							for(i = 0; i < interactionObjects.length; i++){
								io  = interactionObjects[i] as InteractionObject;
							if(io.fingerId == evt.fingerId){
								//apply stationary this object
								io.stationaryTouch(evt);
								makeHit = true;
							}
						}
					break;
					case ProxyTouchPhase.Ended:
					numberActiveTouches =  interactionObjects.length;
					c = 0;
					for(i = 0; i < numberActiveTouches; i++){
						io  = interactionObjects[c] as InteractionObject;
						if(evt.fingerId == io.fingerId ){
							//call completion()
							io.endTouch(evt);
							interactionObjects.RemoveAt(c);
							makeHit = true;
						}else{
							c++;
						}
					}
					break;
					case ProxyTouchPhase.Canceled:
					numberActiveTouches =  interactionObjects.length;
					c = 0;
					for(i = 0; i < numberActiveTouches; i++){
						io  = interactionObjects[c] as InteractionObject;
						if(evt.fingerId == io.fingerId ){
							//call completion
							io.cancelTouch(evt);
							interactionObjects.RemoveAt(c);
							makeHit = true;
						}else{
							c++;
						}
					}
					break;
				}
				if(!makeHit){
					//pass the touch on wards
					availableSlots.Add(evt);
				}
			
			}
			c = 0;
			for(i = 0; i < interactionObjects.length; i++){
				io = interactionObjects[c] as InteractionObject;
			 
				 if(io.isFinished){
					interactionObjects.RemoveAt(c);
				}else{
					c++;
				}
			}
		}
		
		var tLeng:int = availableSlots.length;
		var availableTouchList:ProxyTouch[] = new ProxyTouch[tLeng];
		for(i = 0; i< tLeng; i++){
			availableTouchList[i] = availableSlots.Get(i);
		}
		availableSlots.Clear();
			return availableTouchList;
	}
	 function checkButtonsPress(evt:ProxyTouch):void{
	
	}
	function processTouch(evt:ProxyTouch):void{
		//check the button locations 
		
		//check grab posibilities
		
		//grab disables camera interaction
	}
	function overrideSwipe (go:GameObject) {
		swipeOverride = go;
		swipeOverridden = true;
	}
	function resetSwipe () {
		swipeOverridden = false;
		
	}
	
	function makeSwipeObject(evt:ProxyTouch):void{
		if(swipeController !=  null || swipeOverridden){
			//check swipe distance
			if(evt.deltaPosition.magnitude > 0){
				var io:InteractionObject = new InteractionObject();
				if(swipeOverridden){
					io.createIO(evt.fingerId, swipeOverride);
				}else{
					io.createIO(evt.fingerId, swipeController);
				}
				io.useCollider = false;
				io.beginTouch(evt);
				interactionObjects.Add(io);
				io.beginTouch(evt);
			 
			}
		}
	}
	function performPickUp(target:GameObject):void{
		//print("midpre");
		//dragObject = target;
		//we have made contact with an interactive object 
		var io:InteractionObject = new InteractionObject();
		io.createIO(currentTouch.fingerId, target);
		io.touchNormal = hitNormal;
		io.touchPosition = hitPosition;
		io.beginTouch(currentTouch);
		interactionObjects.Add(io);
		
	
		//we are now in the middle of an interaction so turn off other touching ... unless it the same type of thinsg
	}
	function performTrackLocation(target:GameObject):void{
		 
		//same as perform pick up but only removes event when touch has finished
		var io:InteractionObject = new InteractionObject();
		io.createIO(currentTouch.fingerId, target);
		io.fixedLocation = true;
		io.useCollider = false;
		io.touchNormal = hitNormal;
		io.touchPosition = hitPosition;
		io.beginTouch(currentTouch);
		interactionObjects.Add(io);
		
	
		//we are now in the middle of an interaction so turn off other touching ... unless it the same type of thinsg
	}
	function checkItem(evt:ProxyTouch, io:InteractionObject):boolean{
		var ray = camera.ScreenPointToRay (evt.position);
		var hit : RaycastHit;
		//	layerMask = 1 << 8;
		var coll:Collider = io.coll;
		if (coll.Raycast (ray, hit, Mathf.Infinity)) {
		    //Debug.DrawLine (ray.origin, hit.point);
		//	print("touched hit "+hit.collider.gameObject.name+" tag ="+hit.collider.gameObject.tag);
			//this sends this game object to refer back to 
			// and that it doesn'r require a reciever  in pigmyies anything with grabThis Object
		  
		 	return true;
		}
		return false;
	}
	function rayGrabItem(evt:ProxyTouch):boolean{
		var ray = camera.ScreenPointToRay (evt.position);
		var hit : RaycastHit;
	//	layerMask = 1 << 8;
		if (Physics.Raycast (ray, hit, Mathf.Infinity, layerMask)) {
		    //Debug.DrawLine (ray.origin, hit.point);
		//	print("touched hit "+hit.collider.gameObject.name+" tag ="+hit.collider.gameObject.tag);
			//this sends this game object to refer back to 
			// and that it doesn'r require a reciever  in pigmyies anything with grabThis Object
		 	currentTouch = evt;
			hitPosition = hit.point;
			hitNormal = hit.normal;
			hit.collider.gameObject.SendMessage("grabThisObject",gameObject, SendMessageOptions.DontRequireReceiver);
		 	return true;
		}
		return false;
	}	
}