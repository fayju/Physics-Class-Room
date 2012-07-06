// 
//  ConveyorBelt.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 

class ConveyorBelt extends MonoBehaviour{ 
	public var displaceFactor:float = 0.05;
	private var displace:Vector2 = new Vector2(0, 1);
	private var offset:Vector2;
	private var surface:MeshFilter;
	public var useCustomDirection:boolean = false;
	public var direction:Vector3 = Vector3(0,0,1);
 	public var myMaterial:Material;
	public var speed:float = 5;
 	public var fromSurface:boolean = false;
	public var isMaterialController:boolean = false;
	public var useMassFactor:boolean = false;
	public var cloneSettings:boolean = true;
	function Awake(){
		if(isMaterialController){
			gameObject.name = "conveyorBeltController";
		}

		
	}
	function Start() {
		displace.y = displaceFactor*speed;
	 	if(myMaterial){
			offset = myMaterial.mainTextureOffset;
		} 
		if(isMaterialController){
			 
			UpdateCenter.DefaultCenter().addUpdateObject(gameObject);
		}else{
			if(cloneSettings){
				var go:GameObject = GameObject.Find("conveyorBeltController");
				if(go){
					var cb:ConveyorBelt = go.GetComponent(ConveyorBelt) as ConveyorBelt;
					if(cb){
							
						speed = cb.speed;	
						fromSurface = cb.fromSurface;
						useMassFactor = cb.useMassFactor;
					}
				}
			}
		}
	}	
	function OnCollisionEnter(col:Collision) {
		ApplyForce(col);
	}
	function OnCollisionStay(col:Collision) {
		ApplyForce(col);
	}
	function ApplyForce(col:Collision) {
			for(var contact:ContactPoint in col.contacts) {
				if(col.rigidbody){
					var adirection :Vector3 = transform.right;
					if(useCustomDirection){
						adirection = direction;
					}
					var fact:float = 1.0;
					if(useMassFactor){
						fact = col.rigidbody.mass;
					}
					if(fromSurface){
					 	col.rigidbody.AddForceAtPosition( adirection * speed*10.0*fact , contact.point);
					}else{
						col.rigidbody.AddForce( adirection* speed*10.0*fact );
					}
				}
			}
	}	
	function performUpdate() {
			 if(myMaterial){
					offset = offset + (Time.deltaTime *  displace);
					myMaterial.mainTextureOffset = offset;
			 }
	}
	
}