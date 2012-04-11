// 
//  TweenController.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-08-26.
//  Copyright 2010 fayju. All rights reserved.
// 
class TweenController extends MonoBehaviour{
	private var startLoc:Vector3;
	private var message:Transform;
	public var displaceIn:Vector3 = Vector3(-20,0,0);
	public var displaceOut:Vector3 = Vector3(20,0,0);
	
	public var exitTime:float = 0.6;
	public var enterTime:float = 0.6;
	public var autoDestruct:boolean = false;
	function setup():void{
		message = transform;
		startLoc =transform.position;
		hideDisplay();
	}
	function hideDisplay():void{
		gameObject.active = false;
 		var children = gameObject.GetComponentsInChildren(Transform,true);
		for(var obj  in children){
		var child:Transform = obj as Transform;
		child.gameObject.active = false;
	}
		message.position = startLoc + displaceIn;
	}
	function TweenInOut(   ):void{
			TweenInOut(0);
	}
	function TweenInOut(delay:float  ):void{
		 
		gameObject.active = true;
			var children = gameObject.GetComponentsInChildren(Transform,true);
			for(var obj  in children){
				var child:Transform = obj as Transform;
			child.gameObject.active = true;
		}
		message.position = startLoc + displaceIn;
		 
	 //ANI Ani.Mate.To(transform, enterTime, {"delay":delay, "position": startLoc,"easing": Ani.Mate.AnimationEasingType.BackEasing, "direction":Ani.Mate.EasingType.Out });
		iTween.MoveTo(gameObject,  {"delay":delay, "position": startLoc, "time": enterTime, "easetype":"easeOutBack"});
		
		
		//Invoke("remove",2);
		
		if(autoDestruct){
			Invoke("remove",delay + enterTime + 2);
		}
	}
	function remove(delay:float):void{
		Invoke("remove",delay);
	}
	function remove():void{ 
		var dest:Vector3 = startLoc + displaceOut;
		//ANI Ani.Mate.To(transform, exitTime, {  "position": dest,"easing": Ani.Mate.AnimationEasingType.BackEasing, "direction":Ani.Mate.EasingType.In});
			iTween.MoveTo(gameObject,  { "position": dest, "time": exitTime, "easetype":"easeInBack"});
	}
}