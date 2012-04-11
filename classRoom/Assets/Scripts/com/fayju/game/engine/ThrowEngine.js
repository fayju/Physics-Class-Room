// 
//  ThrowEngine.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-21.
//  Copyright 2011 fayju. All rights reserved.
// 

class ThrowEngine extends InteractiveScene{

	public var gravMult:float = 1.0;

	private var lateTime:float = 0.0;
	private var latePlayBackFactor:float = 1.0;
	private var updateTime:float = 0.0;
	private var playBackFactor:float = 1.0;
	function Awake(){

		lateTime = Time.time;
		updateTime = Time.time;
	 	Physics.gravity.y = -5*gravMult; 
 
		super.Awake();		
		//import the buggies
		  
	}
 
	function StartPostLoad():void{
	  
		super.StartPostLoad();
	 
	}
	function Start():void{
		
	 
		StartPostLoad();
	}
	function OnGameOver():void{
		super.OnGameOver();
	}
	function actualGameOver():void{
		super.actualGameOver();
	}
	function goNextScene():void{
		super.goNextScene();
		//Application.LoadLevel("MiniBeastsGameOverScene");
	}
	function GameUpdate():void{
		
		super.GameUpdate();

/*
			var useInterface:boolean = true;
			//gather touches
			var remainingTouches:ProxyTouch[] =ProxyTouchManager.DefaultManager().touches();//Input.touches;

			//distribute to raycasters
			if(useInterface){
				//remove bumpbuttons hits
				remainingTouches = removeBumpButtons(remainingTouches);

				remainingTouches = interfaceRayCastmanager.updateTouch(remainingTouches ); 
			}
			if(useSceneRayCast){
				remainingTouches = mainRayCastManager.updateTouch(remainingTouches);
			}

			//excessTouches =0;
			//remaining begin touches
			for(var rt:ProxyTouch in remainingTouches){
				if(rt.phase == ProxyTouchPhase.Began){
					excessTouches++;
				}
			}
*/
	}
	// ====================================================================================================
	// = BUMP BUTTONS RELATE TO CONTROLLER BUTTONS THAT ENABLE DIRECT TOUC INTERACTION IE ACCELRATE SHOOT =
	// ====================================================================================================
/*
	function removeBumpButtons(remainingTouches:ProxyTouch[]):ProxyTouch[]{
		//strip touches from bumps
		if(!Application.isEditor){
			for(var b:ButtonToggleControl in bumpButtons){
					b.setOff();
			}
		}
	
		var remain:HashArray = new HashArray();
 
		for(var evt:ProxyTouch in remainingTouches){
				//check touch against colliders
				var ray = interfaceRayCastmanager.camera.ScreenPointToRay (evt.position);
				var hit : RaycastHit;
				//	layerMask = 1 << 8;
				var invalidate:boolean = false;
					if (Physics.Raycast (ray, hit, Mathf.Infinity, interfaceRayCastmanager.layerMask)) {
					    //Debug.DrawLine (ray.origin, hit.point);
					//	print("touched hit "+hit.collider.gameObject.name+" tag ="+hit.collider.gameObject.tag);
						//this sends this game object to refer back to 
						// and that it doesn'r require a reciever  in pigmyies anything with grabThis Object
					  		var tog:ButtonToggleControl = hit.collider.gameObject.GetComponent(ButtonToggleControl);
							if(tog != null){
								invalidate = true;
								tog.setOn();
							}
					  
					}
			
				if(!invalidate){
					remain.Add(evt);
				}
			 
		}
			var tot:int = remain.length;
		var newRemaining:ProxyTouch[] = new ProxyTouch[tot];
	
		for(	var i:int = 0; i < tot; i++){
			newRemaining[i] = remain.Get(i) as ProxyTouch;
		}
	 
		return newRemaining;
		
	}*/

	function endGame(){
	
	}

	// ====================
	// = UPDATE FUNCTIONS =
	// ====================

	function StartGameReady():void{
		
	
		super.StartGameReady();
			// var go:GameObject = GameObject.Find("_InteractionController");
			// mainRayCastManager.swipeController = go;
	}
	function Update(){
			//time factor used throughout (if needed)
			var timeDifference:float = -updateTime  + Time.time;
			updateTime = Time.time;
			playBackFactor = timeDifference*30.0;
			playBackFactor = playBackFactor < 0.1 ? 0.1 : playBackFactor > 1.5 ? 1.5 : playBackFactor;
			
		 
			Definitions.GetInstance().SetTimeFactor(playBackFactor);
			
			if(GameReady && !gameOver && !isPaused){
				accel =  processAccelerometer();
				// buggyController.BuggyUpdate(playBackFactor);
			}
			super.Update();
	}
	function FixedUpdate(){
			if(GameReady && !gameOver ){
				var xa:float =  accel.x;
				var ya:float =  accel.y;
				var za:float =  accel.z;
				var sidecap = 0.25;
				//clamp xy effect of accelerometer
				xa = xa > sidecap ? sidecap: xa;				
				xa = xa < -sidecap ? -sidecap: xa;
				ya = ya > sidecap ? sidecap: ya;
				ya = ya < -sidecap ? -sidecap: ya; 
			 //if we are using the accelerometer
				
			}
			super.FixedUpdate();
	}

	function GetLateTimeFactor():float{
		return latePlayBackFactor;
	}
	function LateUpdate(){
		
			var timeDifference:float = -lateTime  + Time.time;
			lateTime = Time.time;
			latePlayBackFactor = timeDifference*30.0;
			latePlayBackFactor = latePlayBackFactor < 0.2 ? 0.2 : latePlayBackFactor > 3.0 ? 3.0 : latePlayBackFactor;
			if(GameReady && !gameOver){
					if(!isPaused){
				 		//there is no paused
				 	}
				 	//where on screen to place an interface if needed
					//this is used o see if things are on screen
				//var viewLoc:Vector3 = mainCamera.gameObject.camera.WorldToViewportPoint(buggyController.transform.position);
		 
			//	if(useEnvUpdate){
					//REASSIGN
					//environmentTiler.EnvironmentUpdate(pickups);
			//	}
			}
			super.LateUpdate();
	}	
}