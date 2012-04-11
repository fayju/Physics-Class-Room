	public var meshScale: float = 1.0;//the scale to display at in beginning;

	private var filter : MeshFilter;
 	var ballObject: GameObject;// the object to clone  find by tag?
	private var ballList: Array;
	
 //	private var triangles:int[] ;// = mesh.triangles;
	private var groups: Array = new Array();
	private var found: boolean = false;
	private var done : String;
	private var aJoint: HingeJoint;
	private var go: GameObject;
	//var startGravity: float;
	//startGravity = Physics.gravity.magnitude;
	
	//number of links made
	private var links: int= 0;
	function Start(){
			links = 0;
			ballObject = new GameObject("ballObject");
			ballObject.AddComponent(SphereCollider);
			var sp:SphereCollider = 	ballObject.GetComponent(SphereCollider) as SphereCollider;
				
			sp.radius = 0.02;
		 ballObject.AddComponent(Rigidbody);
			//list of balls to represent the verts
			ballList = new Array ();
		//	triangles  = mesh.triangles;
			forceBallSize();
	    	mergeVertices();
 
			filter = gameObject.GetComponent(MeshFilter);
		    var mesh : Mesh =filter.mesh;
		
		var triangles:int[]  = mesh.triangles;
		         // Randomly change vertices
	    var vertices = mesh.vertices;
	  	 trace("verts "+vertices.length + " " + triangles.length);
	  		var ballcount: int = 0;
	      	for(var v in vertices){//run though verts
	//	print("y");
	    		var isExist: boolean = false;
		    	for(var ball:GameObject in ballList){
		    		if(Vector3.Distance(v,ball.transform.position) < 0.1){
		    			isExist = true;
			    		ballList.Add(ball);
		    		}
	    		}
		    	if(!isExist){
		    		ballcount++;
		var aball =  Instantiate (ballObject, transform.TransformPoint(v) , Quaternion.identity);
	
		
		    		ballList.Add(aball );
		    	} 
		}
	    		for(var t : int = 0; t < triangles.length; t+= 3){
				//use this to make the joints between
	   	  			var tris = triangles[t];
	   	   			// 	trace(tris);
	    	 		var triA = triangles[t];
	    			var triB  = triangles[t+1];
	    			var triC  =triangles[t+2];
    	
	    			done = ""+triA+"_"+triB;
			    	for(var c in groups){
				    	if( c == done){
		    				found = true;
		    			}	
	    			}
	    			if(!found){
		    			connectBodys(ballList[triA],ballList[triB]);
		    			groups.Add(done);
	    			}
	    			found = false;
		    		done = ""+triB+"_"+triC;
		    		for(var c in groups){
			    		if( c == done){
				    		found = true;
			    		}	
		    		}
	    			if(!found){
			    	connectBodys(ballList[triB],ballList[triC]);
			    			groups.Add(done);
					}
		    		found = false;
    	
		    		done = ""+triC+"_"+triA;
		    		for(var c in groups){
				    	if( c == done){
				    		found = true;
				    	}	
		    		}
	    			if(!found){
			    		connectBodys(ballList[triC],ballList[triA]);
				    	groups.Add(done);
					}
	    			found = false; 
	    		}//complete  triangle check
	     //	}//complete vert check
	print("softbody.Start : vert length "+vertices.length +" tris :"+ mesh.triangles.length+ " balllist :"+ballcount+" links maade:"+links);
	}
	
	//connect with hinge joint
	function connectBodys( bodyA: GameObject, bodyB: GameObject): void{
	
		var aJoint:Joint = bodyA.AddComponent(HingeJoint);
		
		links++;
	    if(aJoint){
	    	var rb: Rigidbody = bodyB.rigidbody;
	    	if(rb){
	    		aJoint.connectedBody =rb;
	   			// trace(rb);
	    	}
	    }else{
	    	trace("failed joint");
	    }
	}
/*
 * for use with iPhone
var yRot: float = 0;
var xRot: float = 0;*/
	function Update () {
	 
	/*
	 * for use with iPhone
	var accel: Vector3 = iPhoneInput.acceleration;
	accel.Normalize();
	xRot = accel.x*10;
	yRot = accel.y*10;
	xRot = xRot > 3 ? 3 : xRot;
	xRot = xRot < -3 ? -3 : xRot;
	yRot = yRot > 3 ? 3 : yRot;
	yRot = yRot < -3 ? -3 : yRot;
	var newGravity = Vector3(xRot*0.3,-1,yRot*0.3);
	newGravity.Normalize();
	trace(newGravity);
	Physics.gravity = newGravity*startGravity ;
	*/

	//transform.position = Vector3(0,0,0);
		var mesh : Mesh =filter.mesh;
	    // Randomly change vertices
	    var vertices = mesh.vertices;
	    //take the firt entry and make that the location of the ball
    
	    var go: GameObject =  ballList[1]; 
	    var modelCenter : Vector3 =go.rigidbody.position;
   // trace(ballList.length);
		transform.position = modelCenter;
	   	for (var i=0;i<vertices.Length;i++){   
		if(ballList.length > i){
	    	go  =  ballList[i]; 
	    	vertices[i] =- modelCenter + go.rigidbody.position;
			}
	     }
	    mesh.vertices = vertices;
	    mesh.RecalculateBounds();
	    mesh.RecalculateNormals();
	}

	function forceBallSize(){
		//
		filter = GetComponent(MeshFilter);
	    var mesh : Mesh =filter.mesh;
	    var vertices = mesh.vertices;
	    for(var v: int = 0; v <  vertices.length; v++){
	    	vertices[v] = vertices[v]*meshScale;
	    }
    
		mesh.vertices = vertices;
	
	}

	function mergeVertices(){
		filter = GetComponent(MeshFilter);
	    var mesh : Mesh =filter.mesh;
	    var vertices = mesh.vertices;
		var sameIds : Array =  new Array();
		var cloneIds : Array =  new Array();
		for(var v: int = 0; v < vertices.length; v++){
			for(var va: int = 0; va < vertices.length; va++){
				if(v != va){
				if(Vector3.Distance(vertices[v],vertices[va]) < 0.1 && va != v){
					sameIds.Add(va);
					cloneIds.Add(v);
				}	
				
				}
			}
		}
		var  triangles:int[] = mesh.triangles;
		for(var i : int = 0; i < triangles.length; i++){
			for(var s: int = 0; s < sameIds.length; s++){
			if(triangles[i] == sameIds[s]){
				triangles[i] = cloneIds[s];
			}	
			}
		}
		//trace(" vlength "+sameIds.length +" "+vertices.length);
		mesh.triangles = triangles;
	}
	function trace(s){
		print(s);
	}