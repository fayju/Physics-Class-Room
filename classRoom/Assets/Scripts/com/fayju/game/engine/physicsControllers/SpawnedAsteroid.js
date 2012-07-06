#pragma strict
// 
//  SpawnedAsteroid.js
//  Assets
//  
//  Created by Gareth Bushell on 2012-04-18.
//  Copyright 2012 fayju. All rights reserved.
// 

class SpawnedAsteroid extends MonoBehaviour{
	private var spawnId;
	private var spawner:SpawnRandomObjects;
	public var lifeTime:float = 20;
	public var useLifeTime:boolean = true;
	function init (_spawnId:String, _spawner:SpawnRandomObjects) {
		spawner = _spawner;
		spawnId = _spawnId;
		if(useLifeTime){
			Invoke("remove", lifeTime);
		}
	}
	function remove() {
		if(useLifeTime){
			spawner.removeObject(spawnId);
		}
	}
	
 
}
