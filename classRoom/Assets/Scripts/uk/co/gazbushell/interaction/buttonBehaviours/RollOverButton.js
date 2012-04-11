// 
//  RollOverButton
///RollOverButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-22.
//  Copyright 2010 fayju. All rights reserved.
// 

class RollOverButton extends InteractiveGameObject{
	
	var onState:Renderer;
	var offState:Renderer;
	protected var useMesh:boolean = false;
	var isOn:boolean = false;
	private var hidden:boolean = false;
	var oneTouch:boolean = true;
	private var useTrigger:boolean = true;
	function Start():void{
		startButton();
		super.Start();
	}
	function startButton():void{
		if(onState != null && offState != null){
			useMesh = true;
		}
		if(collider != null && useTrigger){
			collider.isTrigger = true;
		}
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
				var isOk:boolean = true;
				if(oneTouch){
					if(Input.touchCount >1){
						isOk = false;
					}
				}
				if(isOk){
					doAction();
				}
		
		}
	}
	function onLostTouch(io:InteractionObject):void{
		setOff();
	}	
	function onCancelTouch(io:InteractionObject):void{
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
		if(useMesh){
			onState.enabled = true;
			offState.enabled = false;
		}
		
	}
	function setOff():void{
	
		isOn = false;
		if(useMesh){
		onState.enabled = false;
		offState.enabled = true;
		}
		
	}
	function showButton():void{
		if(hidden){
			gameObject.active = true;
			var component:Component[] = gameObject.GetComponentsInChildren(Renderer, true);
			for(var comp:Component in component){
				var rend:Renderer = comp as Renderer;
				rend.gameObject.active = true;
				rend.enabled = true;

			}
		hidden = false;
		}
		setOff();
	}
	function hideButton():void{
		if(!hidden){
			var component:Component[] = gameObject.GetComponentsInChildren(Renderer, true);
			for(var comp:Component in component){
				var rend:Renderer = comp as Renderer;
			 
				rend.enabled = false;

			}
			gameObject.active = false;
			hidden = true;
		}
	}
}
