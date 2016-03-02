#pragma strict
@script ExecuteInEditMode()
var target : Transform;
var offset : Vector3;
@Range (0.0, 10.0)
var speed : float;

var guiSkin : GUISkin;
function Start () {
//target = GameObject.Find("Player").transform;

 
}

function Update() {
	transform.position = target.position - offset;
}
