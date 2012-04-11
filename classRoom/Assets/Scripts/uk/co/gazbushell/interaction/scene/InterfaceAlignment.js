// 
//  InterfaceAlignment.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-07-07.
//  Copyright 2011 fayju. All rights reserved.
// 
//purpose assign object to scale interface before any transformations occur , 
var scaleAlignment:ScaleAlignment = ScaleAlignment.CENTER;
function Awake():void{
	var scaleToFitInterface:ScaleToFitInterface =   FindObjectOfType(ScaleToFitInterface);
	if(scaleToFitInterface == null){
		if(!GameObject.Find("ScaleToFitInterfaceTemplate")){
				var scaleInterface:GameObject = Instantiate(Resources.Load("gamecomponents/ScaleToFitInterfaceTemplate"));
				scaleInterface.name = "ScaleToFitInterfaceTemplate";
			}
			scaleToFitInterface =   FindObjectOfType(ScaleToFitInterface);
	}
	if(scaleToFitInterface != null){
		//assign this objects transform
		scaleToFitInterface.addInterfaceGameObject(transform, scaleAlignment);
	}
}
//we're done here go see ScaleToFitInterface.js
