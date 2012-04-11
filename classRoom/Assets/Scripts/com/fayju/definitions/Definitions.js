// 
//  Definitions.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-08-18.
//  Copyright 2011 fayju. All rights reserved.
// 
//0.68|0.7|0.6|0.66|0.68|0.64|0.68|0.68|0.42|0.5|0.76|0.42|0.86|0.74|0.66|0.74|0.68|0.64|0.6|0.6|0.68|0.72|0.98|0.82|0.78|0.68|0.9|0.88|0.84|0.76|0.72|0.68|0.84|0.78|0.68|0.66|0.76|0.7|0.9|0.84|0.82|0.76|0.84|0.82|0.72|0.78|0.76|0.88|1.08|0.92|0.9|0.86|0.72|0.68|0.7|0.72|0.7|0.68|0.72|0.74|0.76|0.7|0.44|0.72|0.72|0.72|0.76|0.68|0.86|0.4|0.42
class Definitions extends MonoBehaviour{
	//to return definitions of name conventioned used 
	static var instance:Definitions;
	static function GetInstance():Definitions{
		if(!instance){
			var go:GameObject = GameObject.Find("_DefinitionsGameObject");
			if(go == null){
				go = new GameObject("_DefinitionsGameObject");
			}
			instance = go.GetComponent(Definitions);
			if(!instance){
				instance = go.AddComponent(Definitions);
			}
		}
		return instance;
	}
	// =====================================
	// = DEFAULT VALUES USED IN MOST GAMES =
	// =====================================
	// Definitions.GetInstance().InterfaceCamera();
	private var interfaceCamera:GameObject;
	function InterfaceCamera():GameObject{
		if(!interfaceCamera){
			interfaceCamera = GameObject.Find("_InterfaceCamera");
			if(interfaceCamera == null){
				
					interfaceCamera = GameObject.Find("InterfaceCamera");
					if(interfaceCamera == null){
						Debug.Log("WARNING :: interactionCamera missing >>>>> check name ");
					}
			 
			}
		}
		return interfaceCamera;
	}
	// Definitions.GetInstance().MainCamera();
	private var mainCamera:GameObject;
	function MainCamera():GameObject{
			if(!mainCamera){
				mainCamera = GameObject.Find("_MainCamera");
				if(mainCamera == null){
					mainCamera = GameObject.Find("MainCamera");
					if(mainCamera == null){
							mainCamera = GameObject.Find("Main Camera");
							if(mainCamera == null){
								Debug.Log("WARNING :: mainCamera missing >>>>> check name ");
							}
					}
				}
			}
			return mainCamera;
	}
	private var interfaceRayCastManager:RayCastManager;
	function InterfaceCameraManager():RayCastManager{
		if(!interfaceRayCastManager){
	  		interfaceRayCastManager= InterfaceCamera().GetComponent(RayCastManager);
			if(!interfaceRayCastManager){
				interfaceRayCastManager = InterfaceCamera().AddComponent(RayCastManager);
			}
		}
		return interfaceRayCastManager;
	}
	function SetSound(f:boolean) {
		PlayerPrefs.SetInt("UseSoundToggle", f ? 1 : 0);
	}
/*	function SetMusic(f:boolean) {
		if(f ? 1 : 0 != PlayerPrefs.GetInt("UseMusicToggle", 1)){
			switch(f){
				case true:
					MaintainHWMusic.DefaultMusic().ResumeMusic();
				break;
				case false:
					MaintainHWMusic.DefaultMusic().PauseMusic();
				break;
			}
		}	
		
		PlayerPrefs.SetInt("UseMusicToggle", f ? 1: 0);
	}*/
	function GetSound():boolean {
		return PlayerPrefs.GetInt("UseSoundToggle", 1) == 1;
	}
	function GetMusic():boolean {
		return PlayerPrefs.GetInt("UseMusicToggle", 1) == 1;
	}
	// ===========================================
	// = MORE SPECIFIC DEFINITIONS TO THIS GAME  =
	// ===========================================	
//	Definitions.GetInstance().IsTitleScreen();
	private var titleScreen:String = "FirstScreenMainGame";
	function IsTitleScreen():boolean{
		return Application.loadedLevelName == titleScreen;
	}
	
	//Definitions.GetInstance().GetTimeFactor();
	private var timeFactor:float = 1.0;
	function GetTimeFactor():float
	{	
		return timeFactor;
	}
	//Definitions.GetInstance().SetTimeFactor(val);
	function SetTimeFactor(val:float):void
	{
	 	timeFactor = val;
	}
}