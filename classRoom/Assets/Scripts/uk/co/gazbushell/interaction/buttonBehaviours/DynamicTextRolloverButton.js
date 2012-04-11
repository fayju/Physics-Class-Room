// 
//  DynamicTextRolloverButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-02-25.
//  Copyright 2011 fayju. All rights reserved.
// 
class DynamicTextRolloverButton extends RollOverButton{

	 
	
	var displayText:TextDisplay;
	var copyText:String = "button";
		
 function Start(){
	if(displayText != null){
		displayText.DrawText(copyText);
	}
	super.Start();
}

}
