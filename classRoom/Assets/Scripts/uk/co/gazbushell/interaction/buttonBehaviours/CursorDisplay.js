var cursor : Texture2D;
var link : Texture2D;
var normal : Texture2D;

/*On mouse over hide the cursor and show the "link" cursor.*/
 private var xloc:float = 0;
 private var yloc:float = 0;
function Start(){
	DontDestroyOnLoad(this);
	showArrow ();
}
function showHand () {
	Screen.showCursor = false;
	cursor = link;
	xloc = 30;
	yloc = 10;
	}

/*On mouse exit reset to the "normal" cursor. You can leave the "normal" variable blank or populate with any texture.*/

function showArrow () {
	Screen.showCursor = false;
	cursor = normal;
	xloc = 32;
	yloc = 32;
	}
	
/*Make the "link" texture follow the cursor.*/

function OnGUI () {
	GUI.Label(Rect(Input.mousePosition.x-xloc, Screen.height - Input.mousePosition.y-yloc, 100, 100), cursor);
}