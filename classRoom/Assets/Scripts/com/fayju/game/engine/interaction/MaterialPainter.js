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
	function OnCollisionEnter ( collisionInfo : Collision){
	
	
		var body: Rigidbody = (collisionInfo.collider.rigidbody);
 
		if(body){
			body.gameObject.renderer.material = paint;
				if(destroyOnHit){
					Destroy(gameObject);
				}
			
		}
		
	
	}
	
}
