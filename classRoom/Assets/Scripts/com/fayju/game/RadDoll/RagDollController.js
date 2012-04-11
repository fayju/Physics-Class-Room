// 
//  RagDollController.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-21.
//  Copyright 2011 fayju. All rights reserved.
// 
class RagDollController extends MonoBehaviour{
	var rigidbodies:Rigidbody[];
	var startFrozen:boolean = true;
	var centralBody:GameObject;
 	var throwPower:float = 100.0;
	var anim:Animation ;
	function Start(){
		if(!anim) {
			anim = gameObject.animation as Animation;
	}
		var components:Component[];
		if(rigidbodies){
			if(rigidbodies.length <= 0){
				components = gameObject.GetComponentsInChildren(Rigidbody,true);
				rigidbodies = new Rigidbody[components.length];
				var i:int = 0;
				for(var c:Component in components){
					rigidbodies[i] = components[i] as Rigidbody;
					i++;
				}
			}
		
			
		}
		if(startFrozen){
			for(var r:Rigidbody in rigidbodies){
				r.isKinematic = true;
			}
		}
	}
	function throwMe(v:Vector3, targetGo:GameObject){
		if(targetGo){
			centralBody = targetGo;
		}
		throwMe(v);
	}
	function throwMe(v:Vector3):void{
	 
		if(anim != null){
			Destroy(anim);
		}
		for(var r:Rigidbody in rigidbodies){
			r.isKinematic = false;
			r.AddForce (v * throwPower*r.mass);
			//r.AddExplosionForce(v.magnitude*r.mass*throwPower, r.transform.position - v.normalized*1.5, 4);
		}
 	//	centralBody.rigidbody.AddExplosionForce(v.magnitude*500, centralBody.transform.position - v.normalized*1.5, 4);
	}
	
}
 