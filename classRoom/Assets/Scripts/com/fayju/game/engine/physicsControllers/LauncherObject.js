// 
//  LauncherObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-19.
//  Copyright 2012 fayju. All rights reserved.
// 

class LauncherObject extends InteractiveGameObject{
	var toSpawn:GameObject;
	var interactionCamera:Camera;
	public var cameraDist:float = 20.0;
	private var isValid:boolean = true;
	var upVector:Vector3 = Vector3(0,0,1);
	public var energy:float = 100.0;
	public var canLaunch:boolean = true;
	public var ballManager:BallManager;
	function Start () {
		 
				if(!interactionCamera){
					Debug.Log("GAZ WARNING :: "+"no interactionCamera Detected on interactive RepelantObject"  );
					isValid = false;
				}else{
				// /	cameraDist = 50;//Vector3.Distance( Vector3(upVector.x*transform.position.x,upVector.y*transform.position.y, upVector.z*transform.position.z),  Vector3(upVector.x*interactionCamera.transform.position.x, upVector.y*interactionCamera.transform.position.y, upVector.z*interactionCamera.transform.position.z ));
				}
	 
	}
	function fireBall (io:InteractionObject) {
		//hide the object,
			var ax:float = io.evt.position.x;
			var ay:float = io.evt.position.y;
		var ball:GameObject = Instantiate(toSpawn, transform.position, transform.rotation);
		var dest:Vector3 = interactionCamera.ScreenToWorldPoint(Vector3 (ax,ay,cameraDist));
		var direction:Vector3 = -transform.position + dest;
		direction.Normalize();
		var materialpainter:MaterialPainter = ball.GetComponent(MaterialPainter);
		materialpainter.useForce = true;
		materialpainter.force = direction*ball.rigidbody.mass*energy;
		 ballManager.hideObjects();
		//make and fire toSpawn
		//tell ballManager to reset 
	}
	
	//because extends InteractiveGameObject
	function onBeginTouch(io:InteractionObject):void{
		//updateLocation (io); 
		io.useCollider = false;
	}
	function onMoveTouch(io:InteractionObject):void{
	//	updateLocation (io);
	}
	function onStationaryTouch(io:InteractionObject):void{
	  
	}
	function onEndTouch(io:InteractionObject):void{
		if(isValid && canLaunch){
		fireBall(io);
		}
	 //	updateLocation (io);
	}
	function onCancelTouch(io:InteractionObject):void{
	  
	}
}