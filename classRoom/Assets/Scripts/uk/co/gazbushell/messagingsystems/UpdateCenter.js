// 
//  UpdateCenter.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-04-21.
//  Copyright 2011 fayju. All rights reserved.
// 


// We need a static method for objects to be able to obtain the default notification center.
// This default center is what all objects will use for most notifications.  We can of course create our own separate instances of NotificationCenter, but this is the static one used by all.
private static var defaultCenter : UpdateCenter;
static function DefaultCenter () : UpdateCenter {
    // If the defaultCenter doesn't already exist, we need to create it
    if (!defaultCenter) {
        // Because the NotificationCenter is a component, we have to create a GameObject to attach it to.
        var updateObject: GameObject = GameObject.Find("Default Update Center");
		if(!updateObject){
			updateObject = 	new GameObject("Default Update Center");
		}
		
        // Add the NotificationCenter component, and set it as the defaultCenter
        defaultCenter = updateObject.GetComponent(UpdateCenter);
		if(!defaultCenter){
			defaultCenter = updateObject.AddComponent(UpdateCenter);
		}
    }
    
    return defaultCenter;
}
private var fixedUpdateList:HashArray = new HashArray();
private var updateList:HashArray = new HashArray();
private var lateUpdateList:HashArray = new HashArray();
//UpdateCenter.DefaultCenter().addFixedUpdateObject(go);
function addFixedUpdateObject(go:GameObject):void{
	fixedUpdateList.Add(go);
}
function removeFixedUpdateObject(go:GameObject):void{
	fixedUpdateList.Remove(go);
}
function addUpdateObject(go:GameObject):void{
	updateList.Add(go);
}
function removeUpdateObject(go:GameObject):void{
	updateList.Remove(go);
}
function addLateUpdateObject(go:GameObject):void{
	lateUpdateList.Add(go);
}
function removeLateUpdateObject(go:GameObject):void{
	lateUpdateList.Remove(go);
}
function FixedUpdate():void{
	if(fixedUpdateList.length > 0){
		for(var i:int = 0; i < fixedUpdateList.length; i++){
			var go:GameObject = fixedUpdateList.Get(i);
			if(go != null){
			go.SendMessage("performFixedUpdate", SendMessageOptions.DontRequireReceiver );
			}else{
				Debug.Log("Warning :: go was null  UpdateCenter FixedUpdate");
			}
		}
	}
}
function Update():void{
	if(updateList.length > 0){
		for(var i:int = 0; i < updateList.length; i++){
			var go:GameObject = updateList.Get(i);
				if(go != null){
				go.SendMessage("performUpdate", SendMessageOptions.DontRequireReceiver );
				}else{
					Debug.Log("Warning :: go was null  UpdateCenter Update");
				}
		}
	}
}
function LateUpdate():void{
	if(lateUpdateList.length > 0){
		for(var i:int = 0; i < lateUpdateList.length; i++){
			var go:GameObject = lateUpdateList.Get(i);
				if(go != null){
				go.SendMessage("performLateUpdate", SendMessageOptions.DontRequireReceiver );
				}else{
					Debug.Log("Warning :: go was null  UpdateCenter LateUpdate");
				}
		}
	}
}
