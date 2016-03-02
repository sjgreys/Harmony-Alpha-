#pragma strict
var propIcon : Transform;
var equipIcon : Transform;
var animIcon : Transform;


function Start () {
if(transform.parent.transform.tag == "Weapon"){
	Instantiate(propIcon, transform.position + Vector3(0,8,0), Quaternion.identity);
	Instantiate(equipIcon, transform.position + Vector3(-8,-4,0), Quaternion.identity);
	Instantiate(animIcon, transform.position + Vector3(8,-4,0), Quaternion.identity);
}
}

function Update () {

}