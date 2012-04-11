// 
//  AutoDestruction.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-03-29.
//  Copyright 2012 fayju. All rights reserved.
// 


#pragma strict
class AutoDestruction extends MonoBehaviour{
	var timeToDestroy:float = 5.0;
	function Start () {
	Destroy(gameObject, timeToDestroy);
	}

 
}