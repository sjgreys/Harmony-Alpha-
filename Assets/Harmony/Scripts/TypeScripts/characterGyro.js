#pragma strict
var playerScript : motorControl;
var moveDirection : Vector3;
var angle : float;
var smoothTurn : boolean;
var turnSpeed : float;
var h : float;
var v : float;
function Start () {
playerScript = transform.root.GetComponent("motorControl");
}

function Update () {
moveDirection = playerScript.moveDirection;
angle = playerScript.angle;
smoothTurn = playerScript.smoothTurn;
turnSpeed = playerScript.turnSpeed;
h = playerScript.h;
v = playerScript.v;
if(smoothTurn){
     if (h >= 0.1 || h <= -0.1 || v >= 0.1|| v <= -0.1)transform.rotation= Quaternion.Lerp(transform.rotation, Quaternion.AngleAxis(90 - angle, Vector3.forward), turnSpeed * Time.deltaTime);
     } else transform.rotation = Quaternion.AngleAxis(90 - angle, Vector3.forward);
}