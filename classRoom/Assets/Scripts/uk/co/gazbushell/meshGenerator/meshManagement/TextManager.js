// 
//  TextManager.js
//  SmashBC
//  
//  Created by Gareth Bushell on 2010-09-27.
//  Copyright 2010 fayju. All rights reserved.
// 
class TextManager extends QuadManager{
	private var uvRects:Rect[];

	private var widthPer:float[];

	var letters:String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@%?+=',.";
	var spaceWidth:String = "n";
	//from flash
	public var factors:String = "0.58|0.62|0.58|0.68|0.62|0.56|0.7|0.62|0.32|0.62|0.58|0.3|0.88|0.68|0.64|0.68|0.68|0.54|0.64|0.6|0.68|0.68|0.88|0.6|0.68|0.66|0.66|0.58|0.62|0.64|0.58|0.58|0.7|0.64|0.58|0.62|0.58|0.58|0.88|0.72|0.72|0.6|0.7|0.6|0.58|0.68|0.68|0.7|0.9|0.62|0.66|0.64|0.7|0.3|0.62|0.6|0.74|0.62|0.72|0.64|0.64|0.66|0.3|0.58|0.64|0.66|0.68|0.54|0.3|0.46|0.38";
	private var numbers:String[];
	function Awake():void{
			var id:int = letters.IndexOf(spaceWidth);
			if(id < 0){
				spaceWidth = ""+letters[0];
			}
		/*var chunks:Component[] = gameObject.GetComponentsInChildren(TextChunk,true);
		for(var comp:Component in chunks){
			comp.gameObject.active = true;
		}*/
	}
	//uses rectangles and also has text scaling params for leading
	function Start():void{
		super.Start();
	}

	function MakeUVRects():void{
		numbers = factors.Split("|"[0]);
		var leng:int = letters.length;
		uvRects = new Rect[leng];
		uvQuads = new UVQuad[leng];
		widthPer = new float[leng];
		var i:int = 0;
		var ax:int = 0;
		var ay:int = 0;
		
		for(var r:int = 0; r <rows; r++){
			for(var c:int = 0; c < cols; c++){
				ax = c*(letterWidth);
				ay = r*(letterHeight);
			
				uvRects[i] = Rect(ax, ay, letterWidth, letterHeight);
				uvQuads[i] = new UVQuad();
				uvQuads[i].updateQuadFromRect(uvRects[i], textureSize);
				
				i++;
			}
		}
		madeRects = true;
	}
	
	function letterSpace(id:int):float{
		var iWidth:float = float.Parse(numbers[id]);
		return letterWidth*iWidth;
	}
	function getSpacePercent():float{
		return getLetterPercent(spaceWidth);
	
	}
	//0.6796875|0.4140625|0.65625|0.640625|0.625|0.6484375|0.640625|0.6171875|0.65625|0.65625|1.0|0.6484375|0.59375|0.640625|0.6171875|0.59375
	function getLetterPercent(str:String):float{
		forceUVRects();
		 var i:int = 0;
		var id:int = letters.IndexOf(str[i]);
		if(id <= -1){
			return 0.0;
		}
		return float.Parse(numbers[id]);
	}
	function getRectUV(id:int):float[]{
		var uvAr:float[] = new float[4];
		var aRect:Rect = uvRects[id];
		uvAr[0] = aRect.x;
		uvAr[1] = aRect.y;
		uvAr[2] = aRect.width;
		uvAr[3] = aRect.height;
		return uvAr;
	}
	function getUVArray(str:String):int[]{
		var lent:int = str.Length;
		var ints:int[] = new int[lent];
		for(var i:int = 0; i< lent; i++){
			var id:int = letters.IndexOf(str[i]);
		 	ints[i] = id;
		}
		return ints;
	}
	function getLetterQuad(str:String):UVQuad{//one char
		var lent:int = str.Length;
		var uvQuad:UVQuad;
		var i:int = 0;
		var id:int = letters.IndexOf(str[i]);
		if(id <= -1){
			return null;
		}
		uvQuad  = uvQuads[id];
		return uvQuad;
	}
	
	function getLetterQuads(str:String):UVQuad[]{
		var lent:int = str.Length;
		var uvQuads:UVQuad[] = new UVQuad[lent];
		for(var i:int = 0; i< lent; i++){
			var id:int = letters.IndexOf(str[i]);
		 	uvQuads[i] = uvQuads[id];
		}
		return uvQuads;
	}
	
	function getQuad(id:int):UVQuad{
		forceUVRects();
		return uvQuads[id];
	}
	
	function isValid(i:int):boolean{
		if(i >= 0 && i < letters.length){
			return true;
		}
		return false;
	}

}

