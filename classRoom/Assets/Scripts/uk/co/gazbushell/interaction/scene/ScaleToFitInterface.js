// 
//  ScaleToFitInterface.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-07-07.
//  Copyright 2011 fayju. All rights reserved.
// 



enum ScaleDisplayMode{ PORTRAIT, LANDSCAPE}
enum ScaleAlignment{TOPLEFT,TOPRIGHT,CENTER,LEFTCENTER,RIGHTCENTER,BOTTOMLEFT,BOTTOMRIGHT, TOPCENTER,BOTTOMCENTER}


var topLeft:Transform;
var topRight:Transform;
var bottomLeft:Transform;
var bottomRight:Transform;
var centerLoc:Transform;

//extra transforms created on demand from origional locations
private var leftCenter:Transform;
private var rightCenter:Transform;
private var topCenter:Transform;
private var bottomCenter:Transform;

private var lastWidth:float = 0;
private var lastHeight:float = 0;
//default proportions = iphone portrait 320/480


private var topLeftStartLoc:Vector3;
private var topRightStartLoc:Vector3;
private var bottomLeftStartLoc:Vector3;
private var bottomRightStartLoc:Vector3;


private var centerTop:Vector3;
private var centerBottom:Vector3;
private var centerLeft:Vector3;
private var centerRight:Vector3;
private var centerPos:Vector3;

private var hasBeenStarted:boolean = false;
var displayMode:ScaleDisplayMode = ScaleDisplayMode.PORTRAIT;


function Start():void{
	topLeftStartLoc = topLeft.position;
	topRightStartLoc = topRight.position;
	bottomLeftStartLoc = bottomLeft.position;
	bottomRightStartLoc = bottomRight.position;
	
	//check colliders
	var go:GameObject;
	var c:Collider;
		
	go = topLeft.gameObject;
	c = go.GetComponent(Collider) as Collider;
	if(c != null){
		c.isTrigger = true;
	}
	go = topRight.gameObject;
	c = go.GetComponent(Collider) as Collider;
	if(c != null){
		c.isTrigger = true;
	}
	go = bottomLeft.gameObject;
	c = go.GetComponent(Collider) as Collider;
	if(c != null){
		c.isTrigger = true;
	}
	go = bottomRight.gameObject;
	c = go.GetComponent(Collider) as Collider;
	if(c != null){
		c.isTrigger = true;
	}
 
	centerTop =topLeftStartLoc +  (-topLeftStartLoc + topRightStartLoc)*0.5;
	centerBottom =bottomLeftStartLoc +  (-bottomLeftStartLoc + bottomRightStartLoc)*0.5;
	centerLeft =topLeftStartLoc +  (-topLeftStartLoc + bottomLeftStartLoc)*0.5;
	centerRight =topRightStartLoc +  (-topRightStartLoc + bottomRightStartLoc)*0.5; 

	var w:float = Screen.width*1.0;
 	var h:float = Screen.height*1.0;
 
	updatePropotions(w,h);
}
function createLocation(scaleAlignment:ScaleAlignment):void{
	
}
function addInterfaceGameObject(myTransform:Transform, scaleAlignment:ScaleAlignment):void{
	var targetParent:Transform;
	var go:GameObject;
	switch(scaleAlignment){
		case ScaleAlignment.TOPLEFT:
			targetParent = topLeft;
		break;
		case ScaleAlignment.TOPRIGHT:
			targetParent = topRight;
		break;
		case ScaleAlignment.CENTER:
			 targetParent = centerLoc;
		break;
		case ScaleAlignment.LEFTCENTER:
			if(!leftCenter){
				//make it 
				go = new GameObject("LeftCenter");
				leftCenter = go.transform;
				leftCenter.position = topLeft.position + (-topLeft.position + bottomLeft.position)/2.0;
				leftCenter.parent = transform;
			}
			targetParent = leftCenter;
		break;
		case ScaleAlignment.RIGHTCENTER:
				if(!rightCenter){
					//make it 
					go = new GameObject("RightCenter");
					rightCenter = go.transform;
					rightCenter.position = topRight.position + (-topRight.position + bottomRight.position)/2.0;
					rightCenter.parent = transform;
				}
				targetParent = rightCenter;
		break;
		case ScaleAlignment.BOTTOMLEFT:
			targetParent = bottomLeft;
		break;
		case ScaleAlignment.BOTTOMRIGHT:
			targetParent = bottomRight;
		break;
		case ScaleAlignment.TOPCENTER:
				if(!topCenter){
					//make it 
					go = new GameObject("TopCenter");
					topCenter = go.transform;
					topCenter.position = topRight.position + (-topRight.position + topLeft.position)/2.0;
					topCenter.parent = transform;
				}
				targetParent = topCenter;
		break;
		case ScaleAlignment.BOTTOMCENTER:
				if(!bottomCenter){
					//make it 
					go = new GameObject("BottomCenter");
					bottomCenter = go.transform;
					bottomCenter.position = bottomRight.position + (-bottomRight.position + bottomLeft.position)/2.0;
					bottomCenter.parent = transform;
				}
				targetParent = bottomCenter;
		break;
	}
	if(!hasBeenStarted){
		if(targetParent){
			myTransform.parent = targetParent;
		}
	}else{
		Debug.Log("WARNING: added to ScaleToFitInterface too late "+myTransform.gameObject.name);
	}
}
function Update() {
	var w:float = Screen.width*1.0;
 	var h:float = Screen.height*1.0;

	if(lastHeight != h || lastWidth != w){
		updatePropotions(w,h);	
		lastHeight = h;
		lastWidth = w;
	}
	
}

function updatePropotions(w:float, h:float):void{
	hasBeenStarted = true;
	var wFact:float =(w/h)/(320/480.0)    ;
	switch(displayMode){
		case ScaleDisplayMode.PORTRAIT:
		wFact = (w/h)/(320/480.0) ;
		break;
		case ScaleDisplayMode.LANDSCAPE:
		wFact = (w/h)/(480/320.0) ;
		break;
	}
	
	 
	
	topLeft.position.x = centerTop.x +(-centerTop.x + topLeftStartLoc.x)*wFact;
	topRight.position.x = centerTop.x +(-centerTop.x + topRightStartLoc.x)*wFact;
	bottomLeft.position.x = centerBottom.x +(-centerBottom.x + bottomLeftStartLoc.x)*wFact;
	bottomRight.position.x = centerBottom.x +(-centerBottom.x + bottomRightStartLoc.x)*wFact;
	
	var newScale:float = wFact > 1? 1: wFact;
  	bottomLeft.localScale = Vector3(newScale,newScale,newScale);
  	bottomRight.localScale = Vector3(newScale,newScale,newScale);
  	topLeft.localScale = Vector3(newScale,newScale,newScale);
  	topRight.localScale = Vector3(newScale,newScale,newScale);
	if(leftCenter){
		leftCenter.localScale = Vector3(newScale,newScale,newScale);
		leftCenter.position = topLeft.position + (-topLeft.position + bottomLeft.position)*0.5;
	}
	if(rightCenter){
  		rightCenter.localScale = Vector3(newScale,newScale,newScale);
		rightCenter.position = topRight.position + (-topRight.position + bottomRight.position)*0.5;
	}
	if(topCenter){
		topCenter.localScale = Vector3(newScale,newScale,newScale);
		topCenter.position = topRight.position + (-topRight.position + topLeft.position)*0.5;
	}
	if(bottomCenter){
  		bottomCenter.localScale = Vector3(newScale,newScale,newScale);
		bottomCenter.position = bottomRight.position + (-bottomRight.position + bottomLeft.position)*0.5;
	}
	if(centerLoc){
		centerLoc.localScale = Vector3(newScale,newScale,newScale);
	}

}