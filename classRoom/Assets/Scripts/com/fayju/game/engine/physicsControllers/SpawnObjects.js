#pragma strict
// 
//  SpawnObjects.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 
class SpawnObjects extends MonoBehaviour{
		public var toSpawn:GameObject;
		public var interval:float = 1.0;
		private var spawnedObjects:Hashtable = new Hashtable();
		private var totalSpawned:int = 0;
		private var spawnId:int = 0;
		public var spawnRef:String = "spawn_";
		public var maxObjects:int = 20;
		
		function Start () {
				Invoke("spawn", interval);
		}
		function spawn () {
			if(totalSpawned < maxObjects){
				makeObject();
			}
			Invoke("spawn", interval);
		}
		function makeObject(){
			if(toSpawn){
				var nextId:String = spawnRef+spawnId;
				var obj:GameObject = Instantiate(toSpawn, transform.position, transform.rotation);
				obj.name = nextId;
				var spawnedObject = obj.AddComponent(SpawnedObject);
				spawnedObject.init(nextId, this);
				spawnedObjects[nextId] = spawnedObject;
				spawnId++;
				totalSpawned++;
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