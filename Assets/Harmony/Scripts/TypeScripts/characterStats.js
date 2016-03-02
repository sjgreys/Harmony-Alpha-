#pragma strict
////////////////////////////////
/////////Base Stats/////////////
////////////////////////////////
var health : int;
var defense : int;
var attack : int;
var intelligence : int;
var strength : int;
var dexterity : int;
var luck : int;

////////////////////////////////
/////////Components/////////////
////////////////////////////////
var playerScript : motorControl;

function Start () {
	playerScript = GetComponent("motorControl");
}

function Update () {

}