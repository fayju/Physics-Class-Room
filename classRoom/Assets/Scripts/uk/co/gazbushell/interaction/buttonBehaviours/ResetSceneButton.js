
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
	function doAction():void{
		if(!isUsed){
			super.doAction();
		 Application.LoadLevel(Application.loadedLevelName);
			isUsed = true;

		}
	}
}