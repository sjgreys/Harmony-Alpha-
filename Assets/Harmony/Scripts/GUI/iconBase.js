#pragma strict
var target : Transform;
var isPressed : boolean;

enum IconType{Equip, Properties, AnimationEditor}
var iconType : IconType;
function Start () {

}

function Activate(){
	if(target.tag == "Weapon"){
		var targetScript : weaponBase = target.GetComponent("weaponBase");
		if(transform.tag == "EquipIcon")target.parent = GameObject.Find("Player").transform;
	}
}