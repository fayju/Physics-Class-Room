#pragma strict
// 
//  BallManager.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-19.
//  Copyright 2012 fayju. All rights reserved.
// 
class BallManager extends MonoBehaviour{
 
	var mats:Material[];
 	var buttons:LauncherObject[];
	var positions:Vector3[];
	var canLaunch:boolean = false;
	
	private var startLoc:float = 0;
	private var endLoc:float = 0;
	
	var reloadInterval:float = 2;
	function Start(){
		for(var i:int = 0; i < buttons.length; i++){
			positions[i] = buttons[i].transform.localPosition;
			buttons[i].canLaunch = false;
			buttons[i].ballManager = this;
		}
		startLoc = transform.position.y;
		endLoc = transform.position.y -5;
	 	transform.position.y  = endLoc;
	 hideObjects ();
	  
	}
	function hideObjects () {
			for(var i:int = 0; i < buttons.length; i++){
				buttons[i].canLaunch = false;
			}
	  transform.position.y = endLoc;
		Invoke("activateObjects", reloadInterval);
	}
	function activateObjects(){
		transform.position.y  = startLoc;
			shufflePositions();
			for(var i:int = 0; i < buttons.length; i++){
				buttons[i].canLaunch = true;
				buttons[i].transform.localPosition = positions[i];
			}
	}
	function shufflePositions () {
		var ar:Array = new Array();
		for(var i:int = 0; i < positions.length; i++){
				ar.Add(positions[i]);
			if(Random.value >= 0.5){
			
			}else{
					var pos2:Vector3 = ar.Shift();
					ar.Add(pos2);
			}
			
		}
		
		if(Random.value >= 0.5){
			var pos:Vector3 = ar.Shift();
			ar.Add(pos);
		}
		 	for(i = 0; i < positions.length; i++){
			positions[i] = ar[i];
			}
	}
	

	
	
}
