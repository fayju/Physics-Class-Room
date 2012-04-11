// 
//  HideRolloverButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-02-14.
//  Copyright 2012 fayju. All rights reserved.
// 


class HideRolloverButton extends RollOverButton{
	
	protected var disabled:boolean = false;
	function Start(){
		super.Start();
		NotificationCenter.DefaultCenter().AddObserver(gameObject, "OnUnLockGameInteraction");
		NotificationCenter.DefaultCenter().AddObserver(gameObject, "OnLockGameInteraction");
	}
	function OnLockGameInteraction():void{
	 
		disabled = true;
			if(useMesh){
				onState.enabled = true;
				offState.enabled = false;
			}	 
	}
	function OnUnLockGameInteraction():void{
		disabled = false;
	 		if(useMesh){
				onState.enabled = false;
				offState.enabled = true;
			}
	}
	function setOn(){
		if(!disabled){
			super.setOn();
		}	
	}
	function setOff(){
		if(!disabled){
			super.setOff();
		}
	}
}
