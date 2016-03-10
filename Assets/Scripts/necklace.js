#pragma strict

var isMoving : boolean;
var isRising : boolean;

var pos : Vector3;
var prevPos : Vector3;

var anim : Animator;
function Start () {
anim = GetComponent(Animator);
}

function Update () {
pos = transform.position;
if(pos != prevPos) isMoving = true;
	else isMoving = false;
	if(pos.x > prevPos.x) transform.localScale.x = 1;
		if(pos.x < prevPos.x)transform.localScale.x = -1;
prevPos = transform.position;

if(isMoving && !isRising) {
	anim.Play("scarfRise");
	isRising = true;
}
	if(!isMoving) {
		anim.Play("scarfIdle");
		isRising = false;
		transform.localScale.x = 1;
	}
}