
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////This Tag Script is applied to all game objects created/////////
////////in the Garden. It is so Harmony can read all custom////////////
////////created objects conveniently///////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
@script ExecuteInEditMode()
var objectName : String;
var inEditor : boolean;
var teleporter : Transform;
private var player : Transform;
var newTeleporter : Transform;
var posOrigin : Vector3;
var endPos : Vector3;
var beingEdited : boolean;//used to determine if was previously in editor, but now not so, and vice versa

//public enum CreationType {Character, Creature, Item, Weapon, Shield, Armor, Vehicle}
var type : String;

function Start(){
	player = GameObject.Find("Player").transform;
	
}
function Update(){
	if(inEditor){
		//if(!newTeleporter  && !beingEdited) newTeleporter = Instantiate(teleporter, transform.position, Quaternion.identity);
		gameObject.layer = 8;
 	transform.position = GameObject.Find("gardenFloor").transform.position + endPos;
		
			//DestroyImmediate(newTeleporter.gameObject);
	} else {
		//if(!newTeleporter && beingEdited) newTeleporter = Instantiate(teleporter, transform.position, Quaternion.identity);		
 			if(transform.position == GameObject.Find("gardenFloor").transform.position)transform.position = posOrigin;
 			gameObject.layer = 0;
	}
	
	 gameObject.name = objectName;
	 
	 beingEdited = inEditor;
}
