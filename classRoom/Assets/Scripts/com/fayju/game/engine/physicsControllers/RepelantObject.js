#pragma strict
// 
//  RepelantObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-17.
//  Copyright 2012 fayju. All rights reserved.
// 
class RepelantObject extends MonoBehaviour{
	
	
	public var radius:float = 5;
	public var strength:float = 50.0;
	public var torqueStrength:float = 50.0;
	public var upVector:Vector3 = Vector3(0,1,0);
	private var myTrans:Transform;
	public var isActive:boolean = false;
	public var useTorque:boolean = false;
	public var isTouchResponsive:boolean = true;
	
	public var interactionCamera:Camera;
	private var cameraDist:float = 20.0;
	function Start () {
			myTrans = transform;
			UpdateCenter.DefaultCenter().addUpdateObject(gameObject);
			if(isTouchResponsive){
				if(!interactionCamera){
					Debug.Log("GAZ WARNING :: "+"no interactionCamera Detected on interactive RepelantObject"  );
					isTouchResponsive = false;
				}else{
					cameraDist = Vector3.Distance( Vector3(upVector.x*transform.position.x,upVector.y*transform.position.y, upVector.z*transform.position.z),  Vector3(upVector.x*interactionCamera.transform.position.x,upVector.y*interactionCamera.transform.position.y,upVector.z*interactionCamera.transform.position.z ));
				}
			}
	}
	 
	function performUpdate():void{
		//this will have to be called before interface touches?
		if(isTouchResponsive && interactionCamera){
			isActive = false;
			var remainingTouches:ProxyTouch[] = ProxyTouchManager.DefaultManager().getTouches();//Input.touches; 
			if(remainingTouches){
			if(remainingTouches.length > 0){
				 //remove one 
				isActive = true;
				var touch:ProxyTouch  = remainingTouches[0];
				//get position information and move location to that point
				 var p : Vector3 = interactionCamera.ScreenToWorldPoint (Vector3 (touch.position.x,touch.position.y,cameraDist) );
				myTrans.position = p;
				var totalTouches:int = remainingTouches.length;
				totalTouches = totalTouches - 1;
				if(totalTouches  <= 0){
					ProxyTouchManager.DefaultManager().clearTouches();
				}else{
					var newTouches:ProxyTouch[] = new ProxyTouch[totalTouches];
					for(var i:int = 1; i <= totalTouches; i++ ){
						newTouches[i - 1] = remainingTouches[i];
					}
					ProxyTouchManager.DefaultManager().setTouches(newTouches);
				}
			}
				//reset touch list
				
			}
		}
		if(isActive){
			doRepell();
		}

	}	
	function doRepell(){
		var hits : RaycastHit[];
	    var charCtrl : CharacterController = GetComponent(CharacterController);
	    var p1 : Vector3 = transform.position;
	    var p2 : Vector3 = Vector3(0,1,0);
	     
	    hits = Physics.SphereCastAll (p1, radius, p2);

	    
	    for (var i = 0;i < hits.Length;i++) {
	        var hit : RaycastHit = hits[i];
	        var rigidbody =  hit.collider.rigidbody;
			
	        if (rigidbody) {
				rigidbody.WakeUp();
	           	var dist:float = hits[i].distance;
				var fact:float = (radius - dist)/radius;
				fact = Mathf.Clamp(fact, 0,1);
				var diff:Vector3 = -myTrans.position + hits[i].point;
				diff.Normalize();
				rigidbody.AddForceAtPosition(diff*strength*fact, hits[i].point,ForceMode.Force);
				
				if(useTorque){
					//get the right angle vector
					var rv:Vector3 = Vector3.Cross(diff, upVector);
					rigidbody.AddTorque(rv*torqueStrength*fact,  ForceMode.Force);
				}
	
	        }
	    }
	}
	
	
}