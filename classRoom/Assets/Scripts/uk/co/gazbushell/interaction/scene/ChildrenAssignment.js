var children:Transform[];
function Awake () {
	for(var t:Transform in children){
		t.parent = transform;
	}
}