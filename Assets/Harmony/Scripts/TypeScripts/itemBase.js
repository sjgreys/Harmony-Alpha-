#pragma strict
/////////////////////////////////////
//////////Character Stats////////////
/////////////////////////////////////	
    var level : int = 0;
    var health : int= 0;
	var defense : int= 0;
	var attack : int = 0;
	var intelligence : int = 0;
	var strength : int = 0;
	var dexterity : int = 0;
	var luck : int = 0;
	
	var buffs : String[];
	var debuffs : String[]; 

function OnUse(){
	if(buffs.length > 0) Buff();
	if(debuffs.Length > 0) Debuff();
}

function Buff(){
	//targetScript.level += level;
	//targetScript.health += health;
	//targetScript.defense += defense;
	//targetScript.attack += attack;
	//targetScript.intelligence += intelligence;
	//targetScript.strength += strength;
	//targetScript.dexterity += dexterity;
	//targetScript.luck += luck;
}

function Debuff(){
//targetScript.level -= level;
	//targetScript.health -= health;
	//targetScript.defense -= defense;
	//targetScript.attack -= attack;
	//targetScript.intelligence -= intelligence;
	//targetScript.strength -= strength;
	//targetScript.dexterity -= dexterity;
	//targetScript.luck -= luck;
}