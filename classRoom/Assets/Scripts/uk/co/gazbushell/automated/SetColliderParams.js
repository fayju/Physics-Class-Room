
public var dynamicFriction: float = 0.5;//	 The friction used when already moving. This value has to be between 0 and 1.
public var staticFriction: float = 0.5;//	 The friction used when an object is lying on a surface. Usually a value from 0 to 1.
public var bouncyness: float = 0.5;//	 How bouncy is the surface? A value of 0 will not bounce. A value of 1 will bounce without any loss of energy.

function Start():void{
	print("start material");
	 var material = new PhysicMaterial();
			material.dynamicFriction = dynamicFriction;//dynamicFriction;
			material.staticFriction = staticFriction;//staticFriction;
			material.bounciness =bouncyness;//bouncyness;
			var colliders:Component[] = gameObject.GetComponentsInChildren(Collider,true);
			for (var comp:Component in colliders) {
					 var cd: Collider  = comp as Collider;
		   			cd.material = material;	    	    	     
			}
}
