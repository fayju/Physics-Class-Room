// 
//  TextDisplay.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-10-28.
//  Copyright 2010 fayju. All rights reserved.
// 

public enum TextChunkAlign{CENTER,LEFT,RIGHT}	
class TextDisplay extends MonoBehaviour{
 	 

	private var textModel:TextModel;
	//abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>?+=/,.
	//|0.76|0.7|0.66|0.7|0.68|0.66|0.66|0.7|0.4|0.6|0.68|0.54|0.8|0.7|0.82|0.66|0.82|0.66|0.64|0.64|0.72|0.74|1|0.66|0.66|0.72|0.76|0.7|0.66|0.7|0.68|0.66|0.66|0.7|0.4|0.6|0.68|0.54|0.8|0.7|0.82|0.66|0.82|0.66|0.64|0.64|0.72|0.74|1.0|0.66|0.66|0.72|0.72|0.45|0.72|0.7|0.68|0.72|0.7|0.68|0.7|0.7|0.4|1.0|1.0|1.0|0.66|0.66|0.6|1.0|1.0
	//0.6|0.62|0.52|0.62|0.58|0.48|0.62|0.54|0.28|0.5|0.62|0.3|0.74|0.64|0.62|0.58|0.58|0.46|0.5|0.52|0.64|0.62|0.74|0.7|0.6|0.5|0.64|0.68|0.58|0.7|0.6|0.46|0.6|0.7|0.32|0.64|0.68|0.52|0.72|0.74|0.68|0.6|0.7|0.7|0.6|0.66|0.68|0.66|0.72|0.7|0.6|0.1|0.1|0.62|0.54|0.6|0.62|0.54|0.6|0.58|0.66|0.68|1.0|1.0|1.0|0.66|0.66|0.6|1.0|1.0
	
	var align:TextChunkAlign = TextChunkAlign.LEFT;
	var material:Material;// the spritesheet
	var displayText:String = "text";
	var drawScale:float = 1.0;
	var kerning:float = 0.0;
	var relativeLoc:Vector3 = Vector3(0,0,0);	
	
	var resourceDefinition:GameObject;
	
	
	var drawOnAwake:boolean = false;
	private var xVect:Vector3 = Vector3(1,0,0);
	private var yVect:Vector3 = Vector3(0,1,0);
	private var zVect:Vector3 = Vector3(0,0,1);
	

	private var isStarted:boolean = false;
	private var drawnText:String = "";
	function Awake():void{
	
	
		if(!material)
			return;
		if(!resourceDefinition){
			switch(material.name){
				case "MyriadPro":
				case "MyriadGoldMaterial":
				resourceDefinition = Resources.Load("_textDisplayMyriadPro");
				break;
				case "bombasticMaterial":
				resourceDefinition = Resources.Load("_textDisplayBombastic");
				break;
				case "ScoreNumberMaterial":
				resourceDefinition = Resources.Load("_textDisplayScoreNumbers");
				break;
				case "monsterTokenText":
				resourceDefinition = Resources.Load("_textDisplayTokens");
				break;
				case "appleNumbersMat":
				resourceDefinition = Resources.Load("_textDisplayAppleNumbers");
				break;
			}
				return;
		}
		drawnText = "";
	
		makeTextModel();
	}
	function makeTextModel():void{
			if(gameObject.GetComponent(TextModel) == null){
				textModel = gameObject.AddComponent(TextModel);
			}else{
				textModel = gameObject.GetComponent(TextModel) ;	
			}

			textModel.resourceGameObject = resourceDefinition;
			drawnText = "";
	}
	function Start():void{
		 	
		//	DrawText("world");
		 
			if(drawOnAwake){
				init();
				DrawText(displayText);
			}else{
				if(textModel == null){
					makeTextModel();
				}
				if(!textModel.hasMesh()){
						init();
						DrawText(displayText);
				
				}
			}
		
	}
	function resetModel () {
			isStarted = false;
		if(!resourceDefinition)
			return;
		if(!material)
			return;
		if(gameObject.GetComponent(TextModel) != null){
			Debug.Log("wiped model");
			textModel = gameObject.GetComponent(TextModel) ;
			textModel.DestroyObjects();
			DestroyImmediate(textModel);
				
		}
		makeTextModel();
		init();
	}
	
	function init():void{
		//if(!isStarted){
			drawnText = "";
			if(textModel != null){
				textModel.init();
				textModel.setMaterial(material);
			
			}else{
			
			}
	/*
		}
			isStarted = true;*/
	
	}
	function DrawTextEditor(text:String):void{
		drawnText = "";//override
		DrawText(text);
	}
	function DrawText(text:String):void{
			if(!resourceDefinition){
				Debug.Log("WARNING NO resourcedefinition");
				return;
			}
			if(!material){
				Debug.Log("WARNING NO material");
				return;
			}
			if(textModel == null){
				makeTextModel();
			}
			if(!textModel.quadManager){
				Debug.Log("WARNING NO quadmanger");
				return;
			}	
		
			drawOnAwake = false;
			init();
			displayText = text;
			if(displayText != drawnText || drawnText == ""){//lets not draw it twice
			
//			Debug.Log(displayText);
			var leng:int = displayText.length;
			var str:int = 0;
			for(var s:int = 0; s < leng; s++){
					if(""+displayText[s] != " "){
						str++;
					}
			}
			//abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>?+=',.
			//0.76|0.7|0.66|0.7|0.68|0.66|0.68|0.7|0.38|0.6|0.68|0.54|0.84|0.72|0.84|0.68|0.86|0.68|0.68|0.64|0.72|0.76|1.04|0.68|0.66|0.74|0.76|0.7|0.66|0.7|0.68|0.66|0.68|0.7|0.38|0.6|0.68|0.54|0.84|0.72|0.84|0.68|0.86|0.68|0.68|0.64|0.72|0.76|1.00|0.68|0.66|0.74|0.74|0.48|0.74|0.7|0.7|0.74|0.72|0.68|0.72|0.72|0.38|0.9|0.9|0.72|0.66|0.66|0.32|0.36|0.36
			var firstLetter:String = "i";
			var drawMag:float = 0;
			textModel.letters = new SpriteDefinition[str];
			var startLoc:Vector3 =  relativeLoc ;//+ zVect*0.01;
			var n:int = 0;
			for(var i:int = 0; i < leng; i++){
				var entry:String = ""+displayText[i];
				if(i == 0){
					firstLetter = entry;
				 	if(entry == " "){
						firstLetter = "n";
					}
				}
				if(entry == " "){
					startLoc = startLoc - xVect*drawScale*textModel.getSpaceWidth() - xVect*kerning;
					drawMag = drawMag - drawScale*textModel.getSpaceWidth() - kerning;
				}else{
					var letterHalf:float = textModel.getLetterShift(entry)*drawScale;
					textModel.letters[n] = textModel.createLetterSprite(entry ,startLoc , drawScale);//- letterHalf*xVect
					startLoc = startLoc - (xVect*drawScale*textModel.getWidth(entry)) - xVect*kerning;
					if(i > 0){
						drawMag = drawMag - drawScale*textModel.getWidth(entry) - kerning;
					}else{
							drawMag = drawMag - drawScale*textModel.getWidth(entry);
					}
					n++;
				}
			}
			
					switch(align){
						case TextChunkAlign.LEFT:
								//leave it this is default
									for(n = 0; n < textModel.letters.length; n++){
										textModel.letters[n].position = textModel.letters[n].position -xVect*drawScale*textModel.getWidth(firstLetter)*0.5 ;
									}
						break;
						case TextChunkAlign.RIGHT:
								for(n = 0; n < textModel.letters.length; n++){
									textModel.letters[n].position = textModel.letters[n].position - drawMag*xVect -xVect*drawScale*textModel.getWidth(firstLetter)*0.5;
								}
						break;
						case TextChunkAlign.CENTER:

							for(n = 0; n < textModel.letters.length; n++){
								textModel.letters[n].position = textModel.letters[n].position - drawMag*(xVect)/2.0 -xVect*drawScale*textModel.getWidth(firstLetter)*0.5;
							}
						break;
					}
	 
			textModel.populateMesh();
			drawnText = displayText;
			}
			
	}

}