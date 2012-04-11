public var mysound: AudioSource;
public var soundId:String = "splat1";
function Start(){
	
		var splat1: GameObject = GameObject.Find(soundId);
		//trace(splat1);
		mysound = splat1.GetComponent("AudioSource");
		//	trace(mySound);
		//	audio = sounds[0];
}
function OnCollisionEnter ( collisionInfo : Collision){
var colName: String = (collisionInfo.collider.gameObject.name);
//trace(colName);
	var vol: float;
//	if(colName == "floor" &&  ! collisionInfo.collider.isTrigger){
		
	
		 if (collisionInfo.relativeVelocity.magnitude > 8){
			vol = (collisionInfo.relativeVelocity.magnitude - 8)/20.0;
		 	if(vol > 1){
		 		vol = 1;
		 	}
		 	mysound.pitch = 1 +(Random.value - 0.5)*0.75;
		 	mysound.volume = 1*(vol);
		 	 	mysound.Play();
		 }

}
function trace(s){
	print(s);
}