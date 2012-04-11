// 
//  IntervalRotation.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-05-26.
//  Copyright 2011 fayju. All rights reserved.
// 

var rAxis:Vector3 = Vector3(0,1,0);
var initialDelay:float = 0;
var pauseTime:float = 3;
var spinTime:float = 0.2;
var rotationAmount:float = -180;
var forceUpRot:boolean = false;
private var lastRot:float = 0;
private var startRot:float = 0;
private var passTime:float;
private var trans:Transform;
private var rotating:boolean = false;
function Start():void{
	if(forceUpRot){
		rAxis = transform.up;
	}
	trans = transform;
	passTime = Time.time + initialDelay;
	UpdateCenter.DefaultCenter().addUpdateObject(gameObject);
}
function DestroyMe():void{
		UpdateCenter.DefaultCenter().removeUpdateObject(gameObject);
}
function performUpdate():void{
	 
	var mills:float = Time.time - passTime;
	var passed:float = 0;
	if(rotating){
		passed = mills/spinTime;
		if(passed >= 1){
			passed = 1;
		}
			trans.RotateAround(trans.position, rAxis, -lastRot + startRot + rotationAmount*passed );
			lastRot = startRot + rotationAmount*passed;
		if(passed == 1){
			rotating = false;
			passTime = Time.time;
		}
	}else{
			passed = mills/pauseTime;
				if(passed >= 1){
					rotating = true;
					passTime = Time.time;
				}
		
	}

	 
}