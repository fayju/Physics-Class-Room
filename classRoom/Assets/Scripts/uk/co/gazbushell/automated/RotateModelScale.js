// 
//  RotateModel.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-08-25.
//  Copyright 2010 fayju. All rights reserved.
// 
var speedFactor:float = 1;
var rAxis:Vector3 = Vector3(0,1,0);
private var trans:Transform;
function Start():void{
	trans = transform;
}
function Update():void{
	trans.RotateAround(trans.position, rAxis, Time.deltaTime*speedFactor);
}