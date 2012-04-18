#pragma strict
// 
//  SpawnedObject.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 

class SpawnedObject extends MonoBehaviour{
	private var spawnId;
	private var spawner:SpawnObjects;
	public var lifeTime:float = 20;
	function init (_spawnId:String, _spawner:SpawnObjects) {
		spawner = _spawner;
		spawnId = _spawnId;
		Invoke("remove", lifeTime);
	}
	function remove() {
		spawner.removeObject(spawnId);
	}
	
 
}
