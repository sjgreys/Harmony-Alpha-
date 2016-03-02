#pragma strict
/////////////////////////////////
///////Core Variables//////////
/////////////////////////////////
@Range (0.0, 10.0)
var speed : int;
@Range (0.0, 10.0)
var turnSpeed : int;
var angle : float;
var possessed : boolean;

var h : float;
var v : float;
/////////////////////////////////////
//////////Character Stats////////////
/////////////////////////////////////	
    var level : int = 1;
    var health : int= 1;
	var defense : int= 1;
	var attack : int = 1;
	var intelligence : int = 1;
	var strength : int = 1;
	var dexterity : int = 1;
	var luck : int = 1;
	var weaponHand : Transform;
    var equippedWeapon : Transform;
    var weaponName : String;
    var isAttacking : boolean;
    var newSword : Transform;
/////////////////////////////////
///////Moving Variables//////////
/////////////////////////////////
var rotationControl : boolean;
public enum MovementType {fourWay, eightWay, free};
var movementType : MovementType;
var smoothTurn : boolean;
var lockedMovement : boolean;
////////////////////////////////
////////////////////////////////



var moveDirection : Vector3;
function Start () {
moveDirection = transform.forward;
}

function OnTriggerEnter(col : Collider){
	if(col.transform.tag == "HitBox"){
	var atkScript : motorControl = col.transform.root.transform.GetComponent("motorControl");
		if(atkScript.isAttacking){
			var colScript : weaponBase = col.transform.parent.transform.GetComponent("weaponBase");
			if(equippedWeapon  && col.transform.parent.transform != equippedWeapon)health -= colScript.attack;
			if(!equippedWeapon)health -= colScript.attack;
		}
	}
}


function Update () {
if(Input.GetButtonDown("Attack")) Attack();

if(health <= 0) Destroy(gameObject);

if(!isAttacking){
//Set Move Variables
var	forward = transform.forward;
     forward = forward.normalized;
     var right  = new Vector3(forward.z, 0, -forward.x);
     	h = Input.GetAxis("Horizontal") * .5;
     	v=Input.GetAxis("Vertical") * .5;
    // moveDirection  = (h * right  + v * forward);
if (h != 0.0 || v != 0.0) {

     angle = Mathf.Atan2(v, -h) * Mathf.Rad2Deg;
     
switch(movementType){
	case MovementType.fourWay :
		var lockedAngle : float = 90;
	break;
	case MovementType.eightWay :
		lockedAngle = 45;
	break;
	case MovementType.free :
		lockedAngle = 1;
	break;
}
var newAngle : float;
	newAngle= Mathf.Round(angle/ lockedAngle) * lockedAngle;
angle = newAngle;
     //transform.rotation = Quaternion.AngleAxis(90.0 - angle, Vector3.up);
     //transform.eulerAngles.x = 270;
     //moveDirection = angle;
     if(rotationControl){
     	
     	}
     if(lockedMovement)transform.position += (transform.position + Vector3(0, angle, 0)) * Time.deltaTime * speed * 2;
     	else transform.position += Vector3(h,v,0) * Time.deltaTime * speed * 2;
 }
     //Move Player Around
     	if(moveDirection != Vector3.zero){     	
     		//transform.forward=(moveDirection);
     		
     	}
     if(newSword){
     	var weaponScript : weaponBase = newSword.GetComponent("weaponBase");
		weaponScript.isAttacking = isAttacking;
     }
   }
}

function Attack(){
//	newSword = Instantiate(equippedWeapon, weaponHand.position, weaponHand.rotation);
	//newSword.parent = weaponHand.transform;
	
	isAttacking = true;
}