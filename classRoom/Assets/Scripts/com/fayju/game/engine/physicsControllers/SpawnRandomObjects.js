#pragma strict
// 
//  SpawnRandomObjects.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-19.
//  Copyright 2012 fayju. All rights reserved.
// 

class SpawnRandomObjects extends MonoBehaviour{
		public var toSpawn:GameObject[];
		private  var interval:float = 1.0;
		private var spawnedObjects:Hashtable = new Hashtable();
		private var totalSpawned:int = 0;
		private var spawnId:int = 0;
		public var spawnRef:String = "spawn_";
		public var maxObjects:int = 20;
		
		public var minSpawnInterval:float = 1.0;
		public var maxSpawnInterval:float = 5;
		
		public var targetRadius:float = 10;
		public var minSpawnRadius:float = 20;
		public var maxSpawnRadius:float = 30;
		public var initForce:float = 200.0;
		
		function Start () {
			interval = Random.Range(minSpawnInterval, maxSpawnInterval);
				Invoke("spawn", interval);
		}
		function spawn () {
			if(totalSpawned < maxObjects){
				makeObject();
			}
				interval = Random.Range(minSpawnInterval, maxSpawnInterval);
			Invoke("spawn", interval);
		}
		function makeObject(){
			if(toSpawn){
				var nextId:String = spawnRef+spawnId;
				var rnd:int = Mathf.Floor(Random.Range(0,toSpawn.length));
				var aSpawn:GameObject = toSpawn[rnd];
				var apos:Vector3 = transform.position;
				var vect:Vector3 = Vector3(1,0,0);
				var trans:Quaternion = Quaternion.AngleAxis(Random.Range(0,360), Vector3(0,1,0));
				vect = trans*vect;
				vect = vect*(Random.Range(minSpawnRadius, maxSpawnRadius));
				
				apos = transform.position + vect;
				
				
				var vect2:Vector3 = Vector3(1,0,0);
				var trans2:Quaternion = Quaternion.AngleAxis(Random.Range(0,360), Vector3(0,1,0));
					vect2 = trans2*vect2;
					vect2 = vect2*(Random.Range(0, targetRadius));
				
					var targetLoc:Vector3 = transform.position + vect2;
					
					
				var obj:GameObject = Instantiate(aSpawn, apos, transform.rotation);
				obj.name = nextId;
				var spawnedObject = obj.GetComponent(SpawnedAsteroid);
				if(!spawnedObject){
					spawnedObject = obj.AddComponent(SpawnedAsteroid);
				}
				spawnedObject.init(nextId, this);
				spawnedObjects[nextId] = spawnedObject;
				spawnId++;
				totalSpawned++;
				
				var body:Rigidbody = obj.rigidbody;
				if(body){
					var diff:Vector3 = -apos + targetLoc;
					diff.Normalize();
					body.AddForce(body.mass*diff*initForce);
				}
			}else{
				Debug.Log("GAZ WARNING :: no object to spawn assigned");
			}
		}
		function removeObject (id:String) {
			var spawnedObject:SpawnedObject = spawnedObjects[id] as SpawnedObject;
			if(spawnedObject){
				Destroy(spawnedObject.gameObject);
				spawnedObjects.Remove(id);
				totalSpawned--;
			}else{
				Debug.Log("warning :: SpawnedObject not found");
			}
		}
		
		
		

}