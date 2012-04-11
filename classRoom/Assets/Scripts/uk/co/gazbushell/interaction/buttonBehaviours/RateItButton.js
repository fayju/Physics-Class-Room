// 
//  RateItButton.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-03-07.
//  Copyright 2011 fayju. All rights reserved.
// 	EtceteraBinding.askForReview(2,3, "Like the game?", "If you like our game, please rate it", "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id="+rateId );

class RateItButton extends DynamicTextRolloverButton{

	var destinationScene:String = "navigation";
	var rateId:int = 423380852;
	private var isUsed:boolean = false;
	function Start():void{
			super.Start();
			//TODO CLOUD	
		 	if(PlayerPrefs.GetInt("_bestScore", 0) < 6000  || PlayerPrefs.GetString("hasRated", "no") == "yup"){
			 	hideButton();
		 	}
	
	}
	function doAction():void{
		if(!isUsed){
			super.doAction();
			//EtceteraBinding.showActivityView();//EtceteraBinding.showBezelActivityViewWithLabel("Loading...");
			isUsed = true;
			RateIt();
		}
	}
	function RateIt():void{
	 
		PlayerPrefs.SetString("hasRated", "yup");
		#if UNITY_IPHONE
		//	EtceteraBinding.askForReview( "Rate Jelly Drop?", "Your ratings mean the world to us. If you like our game, please rate it", "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id="+rateId );
		#endif
		#if UNITY_ANDROID
			Application.OpenURL("market://details?id=com.geekbeach.dunerider");
		#endif
			
	}
}
