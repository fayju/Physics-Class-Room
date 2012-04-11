
function Start () {
	var coliders:Collider[] = GetComponentsInChildren(MeshCollider);

	for(var i:int = 0; i< coliders.length; i++){
		var mc:MeshCollider = coliders[i] as MeshCollider;
		mc.smoothSphereCollisions  = false;
	}
}