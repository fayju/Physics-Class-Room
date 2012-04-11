// 
//  AnimationDelay.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-09-10.
//  Copyright 2010 fayju. All rights reserved.

private var animations:Component[];

function Start(){
 
	animations = gameObject.GetComponentsInChildren(Animation,true);
	for(var comp:Component in animations){
		var anim:Animation = comp as Animation;
		anim.Play();
			for(var state:AnimationState in anim ){
					state.speed =0.001;
			}
	}
	Invoke("playthem", 1);
}

function playthem():void{
	for(var anim:Animation in animations){
		for(var state:AnimationState in anim ){
				state.speed  = 1;
		}
	}
}