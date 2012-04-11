#pragma strict
class PhysicsObject extends MonoBehaviour{

	var evtTheshold:float = 8.0;
	var evtMaximum:float = 20.0;
	var requireRigidbody:boolean = true;
	//when something collides with this this triggers an action
		function Start () {

		}
		
		function OnCollisionEnter ( collisionInfo : Collision){
	 		if(collisionInfo.rigidbody != null || !requireRigidbody){
				var colMag: float;
				 if (collisionInfo.relativeVelocity.magnitude > evtTheshold){
					colMag = (collisionInfo.relativeVelocity.magnitude - evtTheshold)/evtMaximum;
				 	colMag = Mathf.Clamp(colMag, 0, 1.0);
				 
					actionTriggered(colMag);
				 
			
				 }
			}
		}
		function actionTriggered (colMag:float) {
				/*	
				mysound.pitch = 1 +(Random.value - 0.5)*0.75;
		 		mysound.volume = 1*(vol);
		 		mysound.Play();
				*/
		}
		

}