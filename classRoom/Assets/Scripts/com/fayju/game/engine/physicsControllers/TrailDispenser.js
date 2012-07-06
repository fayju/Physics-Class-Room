// 
//  TrailDispenser.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-25.
//  Copyright 2012 fayju. All rights reserved.
// 
enum TrailOrientation{RIGHT,UP,FORWARD}

class TrailDispenser extends MonoBehaviour{
	 
	 	protected var objTransform:Transform;
		var hasTrail:boolean = true;
		protected var trail:TyreTrack;
		var track:String = "_OrbTrack1";
		var drawWidth:float = 1.0;
		var maximumDrawDistance:float = 10;
		var drawElements:int = 20;
	 	var tOrientation:TrailOrientation = TrailOrientation.RIGHT;
		private var isInited:boolean = false;
		function Start():void{
			objTransform = transform;
 			
		 		if(track != "" && hasTrail){
					var tyre:GameObject = Instantiate(Resources.Load("_trails/"+track));
					tyre.name = track;
					trail  = tyre.GetComponent(TyreTrack);
					if(trail){
						trail.tyreWidth = drawWidth;
						trail.maxdrawDistance =  maximumDrawDistance;
						trail.drawElements = drawElements;
				 	 		UpdateCenter.DefaultCenter().addUpdateObject(gameObject);
						
							var orient:Vector3 = Vector3.up;
							switch(tOrientation)
							{
								case TrailOrientation.RIGHT:
								 	orient = objTransform.right;
								break;
								case TrailOrientation.FORWARD:
									orient = objTransform.forward;
								break;
								case TrailOrientation.UP:
									orient = objTransform.up;
								break;
							}
					}else{
						
					}
				}
		
		}
		function performUpdate():void{
			if(hasTrail){
				
				var orient:Vector3 = Vector3.up;
				switch(tOrientation)
				{
					case TrailOrientation.RIGHT:
					 	orient = objTransform.right;
					break;
					case TrailOrientation.FORWARD:
						orient = objTransform.forward;
					break;
					case TrailOrientation.UP:
						orient = objTransform.up;
					break;
				}
 
			 
				trail.updateVerts(objTransform.position, orient);
		   }
		}
	 
}