// 
//  StandardButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-25.
//  Copyright 2010 fayju. All rights reserved.
// 


class StandardButton extends InteractiveGameObject{
	
 var isOn:boolean = false;
	function Start():void{
 
		super.Start();
			setOff();
	}
	function onBeginTouch(io:InteractionObject):void{
 		//show hit state 
		if(!isOn){
			print("set him on");
	 	setOn();
		}
	}
	function onMoveTouch(io:InteractionObject):void{
		//is it still a valid hit?
	}
	function onStationaryTouch(io:InteractionObject):void{
	
	}
	function onEndTouch(io:InteractionObject):void{
		//open a url
		//is it still active 
		if(isOn){
			setOff();
		 doAction();
		
		}
	}
	function onLostTouch(io:InteractionObject):void{
		setOff();
		
	}	
	function onCancelTouch(io:InteractionObject):void{
	 	//
		setOff();
	}
	function doAction():void{
			var audio:AudioSource = gameObject.GetComponent(AudioSource) as AudioSource;
			if(audio != null){
				audio.Play();
			}
	}
	function setOn():void{
	
		isOn = true;
	 
		
	}
	function setOff():void{
	
		isOn = false;
		 
	}
}
