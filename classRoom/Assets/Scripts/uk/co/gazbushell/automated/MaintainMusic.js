var myMusic : AudioSource;  // assign this variable to your music's audio source
private var currentMusicTime = 0.0; // this is used to store and return to the proper playback position for the audio, so it doesn't start over
 
function OnApplicationPause (tempBool : boolean) {
     if (tempBool) {
          // if the argument for this function is true, the app has just been paused
	/*
	 	if(myMusic.clip != null){
	          currentMusicTime = myMusic.time;
			}*/
	
     }
     else {
          // if the argument for this function is false, then the app has just been resumed
	//MainPersistent.usingGC = false;
	if(PlayerPrefs.GetString("hasOver12", "no") == "yes"){
		//	EtceteraBinding.askForReview(4,1, "Like the game?", "If you like our game, please rate it", "itms-apps://itunes.com/apps/geekbeach/amonsteratemychristmas" );
		
		var i:int = PlayerPrefs.GetInt("askRR",0);
		i++;
		PlayerPrefs.SetInt("askRR",i);
		}
	/*
		if(myMusic.clip != null){
	          myMusic.Play();
	          myMusic.time = currentMusicTime;
			}*/
	
     }
}