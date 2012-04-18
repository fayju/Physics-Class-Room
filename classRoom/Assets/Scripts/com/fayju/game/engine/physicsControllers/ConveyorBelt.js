// 
//  ConveyorBelt.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 

class ConveyorBelt extends MonoBehaviour{ 
	
	private var displace:Vector2 = new Vector2(0, 1);
	private var offset:Vector2;
	private var surface:MeshFilter;
	
 
	public var speed:float = 5;
 	public var fromSurface:boolean = false;
	
	function Start() {
		displace.y = 0.2*speed;
		surface = gameObject.GetComponentInChildren(MeshFilter) as MeshFilter;
		offset = surface.renderer.material.mainTextureOffset; 
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
					if(fromSurface){
					 	col.rigidbody.AddForceAtPosition(transform.forward * speed*10.0 , contact.point);
					}else{
						col.rigidbody.AddForce(transform.forward * speed*10.0 );
					}
				}
			}
	}	
	function Update() {
	 
			offset = offset + (Time.deltaTime *  displace);
			surface.renderer.material.mainTextureOffset = offset;
	 
	}
	
}