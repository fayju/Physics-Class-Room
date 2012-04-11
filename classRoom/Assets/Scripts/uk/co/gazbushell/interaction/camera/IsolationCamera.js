// 
//  IsolationCamera.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-11-12.
//  Copyright 2010 fayju. All rights reserved.
// 

class IsolationCamera extends MonoBehaviour{

	var targetCamera:Camera;// the camera to emulate
	private var targetTransform:Transform;
	var isolationCamera:Camera;
	private var layerMask:int;
	var isolationBin:HashArray = new HashArray();
	
//	var paperBG:Renderer;
	function Start():void{
		
		layerMask = 12;
		
		if(targetCamera == null){
			findMainCamera();
		}
		targetTransform = targetCamera.transform;
		
		if(isolationCamera == null){
			
		}
		isolationCamera.enabled = false;
		//paperBG.enabled = false;
				var comp:Component[] = gameObject.GetComponentsInChildren(Renderer, true);
				for(var c:Component in comp){
					var rend:Renderer = c as Renderer;
				rend.enabled = false;
				}
	}
	
	
	
	function findMainCamera():void{
		var cameraObject:GameObject = GameObject.Find("_MainCamera");
		if(cameraObject == null){
			cameraObject = GameObject.FindWithTag("MainCamera");
		}
		if(cameraObject != null){
			targetCamera = cameraObject.GetComponent(Camera) as Camera;
		}
		
	}
	function activateCamera():void{
		if(!isolationCamera.enabled ){
			isolationCamera.transform.position = targetTransform.position;
			isolationCamera.transform.rotation = targetTransform.rotation;
			isolationCamera.enabled = true;
				var comp:Component[] = gameObject.GetComponentsInChildren(Renderer, true);
				for(var c:Component in comp){
					var rend:Renderer = c as Renderer;
				rend.enabled = true;
				}
		}
	}
	function deActivateCamera():void{
		if(isolationCamera.enabled ){
		 
			isolationCamera.enabled = false;
				var comp:Component[] = gameObject.GetComponentsInChildren(Renderer, true);
				for(var c:Component in comp){
					var rend:Renderer = c as Renderer;
				rend.enabled = false;
				}
		}
	}
	function resetIsolation():void{
		if(isolationBin.length > 0){
			var leng:int = isolationBin.length;
			for(var i:int = 0; i < leng; i++){
				var isoObject:IsolationObject = isolationBin.Get(0) as IsolationObject;
				isoObject.resetlayer();
				isoObject.destroy();
				isolationBin.RemoveAt(0);
			}
			isolationBin.Clear();
		}
	}

	function isolateObject(go:GameObject):void{
		
		var isolationObject:IsolationObject = new IsolationObject();
		isolationObject.isolate(go, layerMask);
		isolationBin.Add(isolationObject);
		
	}
	static function ActivateIsolation():void{
			var isoCam:IsolationCamera = IsolationCamera.isoCamera();
				isoCam.activateCamera();
	}
	static function IsolateGameObject(go:GameObject):void{
		var isoCam:IsolationCamera = IsolationCamera.isoCamera();
		isoCam.isolateObject(go);
		isoCam.activateCamera();
	}
	static function IsolateGroup(goList:GameObject[]):void{
			var isoCam:IsolationCamera = IsolationCamera.isoCamera();
			for(var go:GameObject in goList){
				if(go != null){
					isoCam.isolateObject(go);
				}
			}
			isoCam.activateCamera();
	}
	static function ResetIsolation():void{
			var isoCam:IsolationCamera = IsolationCamera.isoCamera();
			isoCam.resetIsolation();
			isoCam.deActivateCamera();
	}
	static function isoCamera():IsolationCamera{
		var go:GameObject =  GameObject.Find("_IsolationCamera");
		if(go == null){
				go = new GameObject("_IsolationCamera");
				go.AddComponent(IsolationCamera);
		}
		var isoCam:IsolationCamera =  go.GetComponent(IsolationCamera) as IsolationCamera;
		
		if(isoCam == null){
			isoCam = go.AddComponent(IsolationCamera) as IsolationCamera;
		}
		
		
		return isoCam;
		
	}
	
	


}