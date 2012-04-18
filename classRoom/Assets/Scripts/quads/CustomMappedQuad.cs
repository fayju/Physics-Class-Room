using UnityEngine;
using System.Collections;

	
public class CustomMappedQuad : MonoBehaviour {
	
	public Rect currentRect = new Rect(0.0f,0.0f,1024.0f,1024.0f);
	public bool swapUVX = false;
	public bool swapUVY = false;
	public float vertScale = 0.004f;
	public Align alignTo = CustomMappedQuad.Align.center;
	
	public enum Align {
		topLeft,
		left,
		center
	}
	
	void Start () {
		///updateMesh( true );	
	}
	
	public void Update () {
		
	}
	
	public void updateMesh()
	{
		updateMesh( false );	
	}
	
	public void updateMesh( bool inGame )
	{

		Texture texture = GetComponent<Renderer>().sharedMaterial.mainTexture;
		
		Vector3[] vertices = new Vector3[4];
        Vector2[] uvs = new Vector2[4];
        int[] triangles = new int[6]{2,1,0,3,2,0};
		
		uvs[swapUVX ? 1 : 0] = new Vector2( currentRect.xMin / texture.width , 1.0f - currentRect.yMin / texture.height );
		uvs[swapUVX ? 0 : 1] = new Vector2( currentRect.xMax / texture.width , 1.0f - currentRect.yMin / texture.height );
		uvs[swapUVX ? 3 : 2] = new Vector2( currentRect.xMax / texture.width , 1.0f - currentRect.yMax / texture.height );
		uvs[swapUVX ? 2 : 3] = new Vector2( currentRect.xMin / texture.width , 1.0f - currentRect.yMax / texture.height );
		
		if ( swapUVY ){
			Vector2 tmp = uvs[0];
			uvs[0] = uvs[3];
			uvs[3] = tmp;
			tmp = uvs[1];
			uvs[1] = uvs[2];
			uvs[2] = tmp;
		}
		
		vertices[0] = new Vector3(0.0f, 0.0f , 0.0f);
		vertices[1] = new Vector3(currentRect.width, 0.0f , 0.0f);
		vertices[2] = new Vector3(currentRect.width, 0.0f, currentRect.height);
		vertices[3] = new Vector3(0.0f, 0.0f, currentRect.height);
		
		if (alignTo == CustomMappedQuad.Align.center ){
			
			vertices[0].x -= currentRect.width * 0.5f;
			vertices[1].x -= currentRect.width * 0.5f;
			vertices[2].x -= currentRect.width * 0.5f;
			vertices[3].x -= currentRect.width * 0.5f;
			
			vertices[0].z -= currentRect.height * 0.5f;
			vertices[1].z -= currentRect.height * 0.5f;
			vertices[2].z -= currentRect.height * 0.5f;
			vertices[3].z -= currentRect.height * 0.5f;
			
		}else if ( alignTo == CustomMappedQuad.Align.left ){
			
			vertices[0].x -= currentRect.width * 0.5f;
			vertices[1].x -= currentRect.width * 0.5f;
			vertices[2].x -= currentRect.width * 0.5f;
			vertices[3].x -= currentRect.width * 0.5f;
			
		}
		
		vertices[0] *= vertScale;
		vertices[1] *= vertScale;
		vertices[2] *= vertScale;
		vertices[3] *= vertScale;
		

		Mesh mesh = new Mesh();
		GetComponent<MeshFilter>().sharedMesh = mesh;
		if ( inGame ) GetComponent<MeshFilter>().mesh = mesh;
		
		mesh.vertices = vertices;
        mesh.uv = uvs;
        mesh.triangles = triangles;
        mesh.RecalculateNormals();
		
	}
	
	
	
}
