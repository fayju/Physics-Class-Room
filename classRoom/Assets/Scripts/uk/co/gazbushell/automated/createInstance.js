var pref:GameObject;
var pref2:GameObject;
function OnMouseUp(){
	if(pref != null){
		Instantiate(pref, Vector3(0,0,0), Quaternion.identity);
		Instantiate(pref2, Vector3(0,0,0), Quaternion.identity);
	}
}
function Update () {
	if(Input.GetMouseButtonDown(0)){
	   OnMouseUp();
	}
	
}