#pragma strict
var chunkObj : Transform;
var chunkSprites : Sprite[];
var chunks : Transform[];
var spread : Vector3;
var force : Vector3;
var spin : Vector3;
function Start () {
	
}

function Update () {
for(var x = 0; x < chunks.length; x++){
		chunks[x] = Instantiate(chunkObj, transform.position + Vector3(Random.Range(-spread.x, spread.x), Random.Range(-spread.y, spread.y), Random.Range(-spread.z, spread.z)), transform.rotation);
		var rend : SpriteRenderer = chunks[x].GetComponent(SpriteRenderer);
		var rb : Rigidbody = chunks[x].GetComponent(Rigidbody);
		rend.sprite = chunkSprites[x];
		rb.AddTorque(Random.Range(-spin.x, spin.x),Random.Range(-spin.x, spin.x),Random.Range(-spin.x, spin.x));
		rb.AddForce(Random.Range(-force.x, force.x), Random.Range(-force.y, force.y), Random.Range(-force.z, force.z));
	} 
}