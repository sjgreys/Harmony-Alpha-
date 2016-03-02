#pragma strict
var target : Transform;
var offset : int;
var speed : int;
function Start () {

}

function LateUpdate () {
transform.position = Vector3.Lerp(transform.position, Vector3(target.position.x, target.position.y, 0 - offset), speed * Time.deltaTime);
}