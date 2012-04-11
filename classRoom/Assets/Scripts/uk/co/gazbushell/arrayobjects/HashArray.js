// 
//  HashArray.js
//  Assets
//  
//  Created by Gareth Bushell on 2010-07-25.
//  Copyright 2010 fayju. All rights reserved.
// 
class HashArray{
	
	public var length:int = 0;
	public var data:Hashtable;

	public function HashArray(){
		
		data = new Hashtable();
		length = 0;
		 
	} 
	public function Add(item){
		
		data.Add("id_"+length, item);
		length++;
		
	}
	public function Get(i:int){
		if(length > i){
			return data["id_"+i];
		}else{
			return null;
		}
	}
	public function Clear(){
		data.Clear();
		length = 0;
	}
	public function Contains(item):boolean{
		var cont:boolean = false;
			for(var i:int = 0; i < length; i++){
				if(Get(i) == item){
					cont = true;
				}
			}
			return cont;
	}
	public function Remove(item):void{
		var id:int = -1;
			for(var i:int = 0; i < length; i++){
				if(Get(i) == item){
				id = i;
				}
			}
			if(id >= 0){
			RemoveAt(id);
			}
	}
	public function RemoveAt(r:int):void{
		
		data.Remove("id_"+r);
		for(var i:int = 0; i < length; i++){
			if(i == r){
				//nothing
			}
			if(i > r){
				var d:String = "id_"+i;
				var ni:int = i -1;
				var n:String = "id_"+ni;
				var item = data[d];
				data.Add(n,item);
				data.Remove(d);	
			}
		}
	length--;	
	}
	function ShuffleArray(){
		var ret:HashArray = new HashArray();
		var l:int = length;
		for(var i:int = 0; i< l ; i++){
		 
			var en:int = Random.Range(0, length);
			ret.Add(Get(en));
			RemoveAt(en);
		}
		Clear();
		for(i = 0; i< ret.length; i++){
			Add(ret.Get(i));
		}
		ret.Clear();	
	}
	
}