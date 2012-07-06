#pragma strict
// 
//  MaterialPainter.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 
class MaterialPainter extends MonoBehaviour{
	var paint:Material;
	 var destroyOnHit:boolean = false;
	var force:Vector3;
	var useForce:boolean = false;
 
	function Update(){
		if(useForce){
			 
			gameObject.rigidbody.AddForce(force);
			force = force*0.99;
		}
	}
	function OnCollisionEnter ( collisionInfo : Collision){
	
	useForce = false;
		var body: Rigidbody = (collisionInfo.collider.rigidbody);
 
		if(body){
			body.gameObject.renderer.material = paint;
				if(destroyOnHit){
					Destroy(gameObject);
				}
			
		}
		
	
	}
	
}
