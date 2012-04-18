// 
//  DragableObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-17.
//  Copyright 2012 fayju. All rights reserved.
// 

class DragableObject extends InteractiveGameObject{
		public var interactionCamera:Camera;
		private var cameraDist:float = 20.0;
		
		public var body:Rigidbody; 
		public var upVector:Vector3 = Vector3(0,1,0);
		public var forceFrozen:boolean = true;
		public var lockX:boolean = false;
		public var lockY:boolean = false;
		private var isValid:boolean = true;
		function Start () {
				body = rigidbody;
				if(!body){
					body = transform.parent.rigidbody;
				}
				if(!body){
				 	Debug.Log("GAZ WARNING :: "+"no rigidbody found for DragableObject"  );
					isValid = false;
				}else{
					if(forceFrozen){
					body.isKinematic = true;
					}
					if(!interactionCamera){
						Debug.Log("GAZ WARNING :: "+"no interactionCamera Detected on interactive RepelantObject"  );
						isValid = false;
					}else{
						cameraDist = Vector3.Distance( Vector3(upVector.x*transform.position.x,upVector.y*transform.position.y, upVector.z*transform.position.z),  Vector3(upVector.x*interactionCamera.transform.position.x, upVector.y*interactionCamera.transform.position.y, upVector.z*interactionCamera.transform.position.z ));
					}
				}
		}
		function updateLocation (io:InteractionObject) {
			if(isValid){
				var p : Vector3 ;
				var ax:float = io.evt.position.x;
				var ay:float = io.evt.position.y;
				if(lockX || lockY){
					var lock:Vector3 = interactionCamera.WorldToScreenPoint(rigidbody.position);
					if(lockX){
						ax = lock.x;
					}
					if(lockY){
						ay = lock.y;
					}
				}
				p = interactionCamera.ScreenToWorldPoint (Vector3 (ax,ay,cameraDist) );
				rigidbody.MovePosition(p) ;
			}
		}
		
 
		//because extends InteractiveGameObject
		function onBeginTouch(io:InteractionObject):void{
			updateLocation (io); 
			io.useCollider = false;
		}
		function onMoveTouch(io:InteractionObject):void{
	 		updateLocation (io);
		}
		function onStationaryTouch(io:InteractionObject):void{
		  
		}
		function onEndTouch(io:InteractionObject):void{
		 	updateLocation (io);
		}
		function onCancelTouch(io:InteractionObject):void{
		  
		}
	  
		
}