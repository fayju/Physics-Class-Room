#pragma strict
class ExplodingObject extends PhysicsObject{
	var explosionObject:String = "explosions/boom_explosion";
	var explosion:GameObject;
	protected var hasExploded:boolean = false;
	function Start () {
		if(!explosion){
			explosion = Resources.Load(explosionObject);
		}
	}
	function actionTriggered (colMag:float) { 
		//explode and send out force
		//
		var pos:Vector3 = transform.position;
		if(!hasExploded){
			Instantiate(explosion, pos, transform.rotation	);
		}
		var rad:float = 4;
		
			var cols:Collider[] = Physics.OverlapSphere (pos,rad ) ;
			for(var col:Collider in cols){
				if(col.rigidbody != null){
					Debug.Log(col.gameObject.name);
						col.rigidbody.AddExplosionForce(1500*col.rigidbody.mass, pos, rad);
				}
			}
		 
		Destroy(gameObject);
		
	}
	
	
}
