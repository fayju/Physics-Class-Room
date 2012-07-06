// 
//  TextDisplayEditor.js
//  Assets
//  
//  Created by Gareth Bushell on 2011-08-19.
//  Copyright 2011 fayju. All rights reserved.

@CustomEditor(TextDisplay) 
class TextDisplayEditor extends Editor {
 
    function OnInspectorGUI() {
        var textDisplay : TextDisplay = target as TextDisplay;
        var forceDraw:boolean = false;
        EditorGUILayout.BeginVertical ();

		textDisplay.material = EditorGUILayout.ObjectField ("Text Material", textDisplay.material, Material, false);
		
			if(!textDisplay.resourceDefinition){
				switch(textDisplay.material.name){
					case "MyriadPro":
					case "MyriadGoldMaterial":
						textDisplay.resourceDefinition = Resources.Load("_textDisplayMyriadPro");
					break;
					case "bombasticMaterial":
						textDisplay.resourceDefinition = Resources.Load("_textDisplayBombastic");
					break;
					case "ScoreNumberMaterial":
						textDisplay.resourceDefinition = Resources.Load("_textDisplayScoreNumbers");
					break;
					case "monsterTokenText":
						textDisplay.resourceDefinition = Resources.Load("_textDisplayTokens");
					break;
					case "appleNumbersMat":
						textDisplay.resourceDefinition = Resources.Load("_textDisplayAppleNumbers");
					break;
				}
			/*0.58|0.62|0.52|0.62|0.52|0.42|0.58|0.62|0.3|0.44|0.62|0.32|0.84|0.62|0.58|0.62|0.62|0.52|0.48|0.44|0.62|0.58|0.76|0.58|0.58|0.54|0.58|0.62|0.52|0.62|0.52|0.42|0.58|0.62|0.3|0.44|0.62|0.32|0.84|0.62|0.58|0.62|0.62|0.52|0.48|0.44|0.62|0.58|0.76|0.58|0.58|0.54|0.58|0.58|0.58|0.58|0.58|0.58|0.58|0.58|0.58|0.58|0.44|0.62|0.62|0.58|0.64|0.62|0.38|0.36|0.36	 */
			}
		textDisplay.resourceDefinition = EditorGUILayout.ObjectField ("Text Resource", textDisplay.resourceDefinition, GameObject, false);
		
		
		//kerning
		var oldKern:float = textDisplay.kerning;
		textDisplay.kerning = EditorGUILayout.FloatField("Kerning",textDisplay.kerning );
		if(oldKern != textDisplay.kerning){
			forceDraw = true;
		}
		//drawscale
		var oldScale:float = textDisplay.drawScale;
	
		textDisplay.drawScale = EditorGUILayout.FloatField("Draw Scale",textDisplay.drawScale );
		
		if(oldScale != textDisplay.drawScale){
			forceDraw = true;
		}
		//relative loc
		var lastloc:Vector3 = textDisplay.relativeLoc;
		textDisplay.relativeLoc = EditorGUILayout.Vector3Field ("Relative Loc",textDisplay.relativeLoc);
		if(lastloc != textDisplay.relativeLoc){
			forceDraw = true;
		}
		//draw on awake
		textDisplay.drawOnAwake = EditorGUILayout.Toggle ("Draw On Awake?", textDisplay.drawOnAwake);
		
		var lastAlign:TextChunkAlign = textDisplay.align;
		textDisplay.align = EditorGUILayout.EnumPopup( "align to:", textDisplay.align);
		if(lastAlign != textDisplay.align){
			forceDraw = true;
		}
		var oldText:String = 	textDisplay.displayText;
		textDisplay.displayText =  EditorGUILayout.TextField( "Display Text", textDisplay.displayText );
		if(oldText != textDisplay.displayText){
			forceDraw = true;
		}
		
		EditorGUILayout.BeginHorizontal();
        EditorGUILayout.PrefixLabel ("commit");
       	if ( GUILayout.Button("update Text")  || forceDraw) {
			textDisplay.DrawTextEditor(textDisplay.displayText);
			EditorUtility.SetDirty (target);
		}
		 	if ( GUILayout.Button("Wipe Text")) {
				textDisplay.resetModel();
				EditorUtility.SetDirty (target);
			}
		EditorGUILayout.EndHorizontal();
		
	 
        EditorGUILayout.EndVertical ();

        
        
    }
}