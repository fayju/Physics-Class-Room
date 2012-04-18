using UnityEngine;
using UnityEditor;
using System.Collections;

[CustomEditor(typeof(CustomMappedQuad))]
public class CustomMappedQuadInspector : Editor {
	
	override public void OnInspectorGUI () {
		
		EditorGUILayout.BeginVertical();
		
		CustomMappedQuad targetObject = target as CustomMappedQuad;
		Rect currentRect = targetObject.currentRect;
		
		currentRect.x = Mathf.Round(currentRect.x);
		currentRect.y = Mathf.Round(currentRect.y);
		currentRect.width = Mathf.Round(currentRect.width);
		currentRect.height = Mathf.Round(currentRect.height);
		
        targetObject.currentRect = EditorGUILayout.RectField( "Texture Rect", currentRect );
		targetObject.swapUVX = EditorGUILayout.Toggle("Swap UV X", targetObject.swapUVX );
		targetObject.swapUVY = EditorGUILayout.Toggle("Swap UV Y", targetObject.swapUVY );
		targetObject.alignTo = (CustomMappedQuad.Align)EditorGUILayout.EnumPopup( "Alignment", targetObject.alignTo );
		
        if (GUI.changed)
		{
			targetObject.updateMesh();
			EditorUtility.SetDirty (target);
			
		}
		
		if ( GUILayout.Button("Create mesh") ) {
			generateAssetMesh();	
		}
		if ( GUILayout.Button("Refresh mesh") ) {
			targetObject.updateMesh();
			EditorUtility.SetDirty (target);
		}
		
		EditorGUILayout.EndVertical();
    }
	
	[ContextMenu("Generate Asset mesh")]
	public void generateAssetMesh()
	{
		CustomMappedQuad targetObject = target as CustomMappedQuad;
		AssetDatabase.CreateAsset(targetObject.GetComponent<MeshFilter>().sharedMesh, "Assets/CustomMappedQuad/" +targetObject.gameObject.name + "_mesh.asset");
	}
	
	
	
	
}

