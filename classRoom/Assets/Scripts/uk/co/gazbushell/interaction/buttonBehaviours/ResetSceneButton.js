
// 
//  ResetSceneButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-11.
//  Copyright 2012 fayju. All rights reserved.
// 
#pragma strict
class ResetSceneButton extends DynamicTextRolloverButton{
	private var isUsed:boolean = false;
	public var goScene:String = "non";
	function doAction():void{
		if(!isUsed){
			super.doAction();
			if(goScene == "non"){
		 		Application.LoadLevel(Application.loadedLevelName);
			}else{
				Application.LoadLevel(goScene);
			}
			isUsed = true;

		}
	}
}