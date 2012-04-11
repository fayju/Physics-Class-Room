// 
//  GamePlayData.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-11-21.
//  Copyright 2011 fayju. All rights reserved.
// 

//allows you to find the game play data
class GamePlayData extends MonoBehaviour{
	
	private static var instance:GamePlayData;
	static function GetInstance():GamePlayData
	{
		if(!instance){
			var go:GameObject = new GameObject("GamePlayData");
			instance = go.AddComponent(GamePlayData);
		}
		return instance;
	}
	
 
	// ====================
	// = MAIN CAMERA DATA =
	// ====================
	//GamePlayData.GetInstance().GetMainCameraTransform();
	private var mainCameraTransform:Transform;
	function GetMainCameraTransform():Transform
	{
		if(!mainCameraTransform){
			var go:GameObject = GameObject.Find("_MainCamera");
			mainCameraTransform = go.transform;
		}
		return mainCameraTransform;
	}
 	//GamePlayData.GetInstance().GetControlledObjectTransform();
	function GetControlledObjectTransform():Transform{
		//what transform objects is being controlled
		return transform;
	}

	// ====================
	// = ENVIRONMENT DATA =
	// ====================
 
 
}
