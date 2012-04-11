// 
//  RagDollInteraction.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-02-20.
//  Copyright 2012 fayju. All rights reserved.
// 
class RagDollInteraction extends ThrowableObject{
	
	var ragDoll:RagDollController;
	
		function throwObject(v:Vector3){
			Debug.Log("throw me");
			ragDoll.throwMe(v);
		}
}