// 
//  MakePersistent.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-27.
//  Copyright 2010 fayju. All rights reserved.
// 

function Start():void{
	//	DontDestroyOnLoad( this );
		    /*
		    	iPhoneKeyboard.autorotateToPortrait = false;
		    		
		    				if(iPhoneSettings.model == "iPad"){
		    					iPhoneKeyboard.autorotateToPortraitUpsideDown = true;
		    				}else{
		    					iPhoneKeyboard.autorotateToPortraitUpsideDown = false;
		    				}
		    				
		    				iPhoneKeyboard.autorotateToLandscapeRight = false;
		    				iPhoneKeyboard.autorotateToLandscapeLeft = false;
		    					if ((Input.deviceOrientation != DeviceOrientation.LandscapeLeft) || (iPhoneSettings.screenOrientation != iPhoneScreenOrientation.LandscapeLeft)){ 
		    					iPhoneSettings.screenOrientation = iPhoneScreenOrientation.LandscapeLeft;
		    					//OpenFeint.SetDashboardOrientation(DeviceOrientation.LandscapeLeft);
		    				 	AdBinding.rotateToOrientation( DeviceOrientation.LandscapeLeft );
		    					}
		    				EtceteraBinding.enableAntiAliasing( false, 0 );*/
		    
}

/*
//temp some buttons
function OnGUI():void
{
		var yPos:float = 5.0;
		var xPos:float  = 5.0;
		var width:float  = 200.0;
	 	var height:float = 40.0;
	 	var heightPlus:float = height + 10.0;
		yPos = yPos + heightPlus;
		if( GUI.Button( new Rect ( xPos, yPos, width, height), "Enable MSAA 4x" ) )
		{
			EtceteraBinding.enableAntiAliasing( true, 4 );
		}
	
		yPos = yPos + heightPlus;
		if( GUI.Button( new Rect ( xPos, yPos, width, height), "Enable MSAA 2x" ) )
		{
			EtceteraBinding.enableAntiAliasing( true, 2 );
		}
	
		yPos = yPos + heightPlus;
		if( GUI.Button( new Rect( xPos,yPos , width, height ), "Disable MSAA" ) )
		{
			EtceteraBinding.enableAntiAliasing( false, 0 );
		}
 }*/
