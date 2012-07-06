// 
//  ProxyTouchManager.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-01-20.
//  Copyright 2011 fayju. All rights reserved.
// 
#pragma strict
enum ProxyTouchPhase
{
	Stationary,
	Canceled,
    Moved,
    Ended,
    Began,
	Null
}
//ProxyTouchManager.DefaultManager().touches();
private static var defaultManager : ProxyTouchManager;
static function DefaultManager () : ProxyTouchManager {
    // If the defaultCenter doesn't already exist, we need to create it
    if (!defaultManager) {
        // Because the NotificationCenter is a component, we have to create a GameObject to attach it to.
        var proxyTouchManager: GameObject = new GameObject("Default Proxy Touch Manager ");
        // Add the NotificationCenter component, and set it as the defaultCenter
        defaultManager = proxyTouchManager.AddComponent(ProxyTouchManager);
    }
    
    return defaultManager;
}
var lastPos:Vector2;
var lastPhase:ProxyTouchPhase;
private var mouseIsDown:boolean = false;
function touchCount():int
   {
        
     
           if(Input.GetMouseButton(0)  || Input.GetMouseButtonUp(0) || Input.GetMouseButtonDown(0))
               return 1;
           else
               return 0;
      
   }
private var touchCache:ProxyTouch[];
//ProxyTouchManager.DefaultManager().getTouches();
function getTouches():ProxyTouch[]{
	return touchCache;
}
//ProxyTouchManager.DefaultManager().setTouches(t);
function setTouches(t:ProxyTouch[]){
	touchCache = t;
}
function clearTouches(){
	touchCache = new ProxyTouch[0];
}
function touches():ProxyTouch[]{
	
	
	//using mouse or using touch? or both?
	//intercept iphone code here to collect and convert Touch to ProxyTouch
	
	//Input.touches cyclethrough and convert - and add to ProxyTouch[]
	
		var pTouches:ProxyTouch[];
		var totalTouches:HashArray = new HashArray();
	
	// ===========================================================================
	// = insert the code here for iphone that collects and simulates the touches =
	// ===========================================================================
	var getTouches:boolean= false;
	#if UNITY_IPHONE
		getTouches = true;
	#endif
		#if UNITY_EDITOR
getTouches = true;
		#endif
		#if UNITY_ANDROID
		getTouches = true;
		#endif

		if(getTouches){
			// Debug.Log(Input.touchCount+" touch count");
					for(var touch:Touch in Input.touches){
						 	var proxyTouch:ProxyTouch = new ProxyTouch();
					        proxyTouch.fingerId = touch.fingerId;
							proxyTouch.deltaTime = touch.deltaTime;
							proxyTouch.deltaPosition =touch.deltaPosition;
					        proxyTouch.position = touch.position;
							switch(touch.phase){
								case TouchPhase.Began:
								 proxyTouch.phase = ProxyTouchPhase.Began;
								break;
								case TouchPhase.Moved:
								 proxyTouch.phase = ProxyTouchPhase.Moved;
								break;
								case TouchPhase.Stationary:
								 proxyTouch.phase = ProxyTouchPhase.Stationary;
								break;
								case TouchPhase.Ended:
								 proxyTouch.phase = ProxyTouchPhase.Ended;
								break;
								case TouchPhase.Canceled:
								 proxyTouch.phase = ProxyTouchPhase.Canceled;

								break;
								default:
								 proxyTouch.phase = ProxyTouchPhase.Null;
								break;
							}
							totalTouches.Add(proxyTouch);
					}
		}
 
	// =======================================
	// = end here the device touc collection =
	// =======================================
	// =======================================
	// = clear this below hen only on iphone =
	// =======================================
	var aTouch:ProxyTouch;
	#if UNITY_STANDALONE_OSX
		if(touchCount() > 0 ){
		aTouch = getMouseTouch(0);
			totalTouches.Add(aTouch); 
		}
		lastPos = Input.mousePosition;
		#endif
		#if UNITY_EDITOR
			if(touchCount() > 0 ){
				aTouch = getMouseTouch(0);
				totalTouches.Add(aTouch); 
			}
			lastPos = Input.mousePosition;
			#endif
	// =============================
	// = allow the rest to run out =
	// =============================		
		
		var tot:int = totalTouches.length;
		
		pTouches = new ProxyTouch[tot];
		if(tot > 0){
			for(var i:int = 0; i < tot; i++){
				pTouches[i] = totalTouches.Get(i) as ProxyTouch;
			}
		}
		
		return pTouches;
}
function getMouseTouch(ID:int):ProxyTouch{
	 	var proxyTouch:ProxyTouch = new ProxyTouch();
        proxyTouch.fingerId = 0;
		proxyTouch.deltaTime = Time.deltaTime;
		proxyTouch.deltaPosition = - lastPos +  Input.mousePosition;
        proxyTouch.position = Input.mousePosition;
        
        if(Input.GetMouseButtonDown(ID)){
			//started hit
			mouseIsDown = true;
            proxyTouch.phase = ProxyTouchPhase.Began;
        }else{
	
  		if(Input.GetMouseButton(ID)){
			//moved or stationary;
			mouseIsDown = true;
            proxyTouch.phase = ProxyTouchPhase.Moved;
		}else{
		
			 if(Input.GetMouseButtonUp(ID)){
		            proxyTouch.phase = ProxyTouchPhase.Ended;
				}else{
					if(lastPhase == ProxyTouchPhase.Ended){
						proxyTouch.phase = ProxyTouchPhase.Null;
					}else{
						proxyTouch.phase = ProxyTouchPhase.Ended;
					}
				}
		
		
			}
		}

		lastPhase  = proxyTouch.phase;
		
		//Debug.Log(proxyTouch.phase);
        return proxyTouch;
}