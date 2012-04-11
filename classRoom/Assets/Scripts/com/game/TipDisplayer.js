var tips:String[];
var display:TextDisplay;
function Start () {
	if(tips.length > 0){
	 
			var rnd:int = Random.Range(0,tips.length);
			display.DrawText(tips[rnd]);
		//	display.DrawText("Bad landings wipe the StuntOMeter");
 
	}
}