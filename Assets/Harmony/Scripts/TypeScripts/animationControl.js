#pragma strict
//@script ExecuteInEditMode()
var motorScript : motorControl;
private var pos : Vector3;
private var posPrev : Vector3;
private var anim : Animator;
var time : float;
var inEditor : boolean;
enum MState {Idle, Walking, Attacking, Using, Interacting, Talking}
var movementState : MState;
enum Direction{Up, UpRight, Right, DownRight, Down, DownLeft, Left, UpLeft}
var moveDirection : Direction;
var angle : float;
var isAttacking : boolean;
var coolDown : float;
var coolDownCount : float;

function Start () {
motorScript = GetComponent("motorControl");
anim = GetComponent("Animator");
posPrev = transform.position;
}


function Update () {
//isAttacking = motorScript.isAttacking;
if(Input.GetButtonDown("Attack") && !isAttacking) Attack();

if(!anim)anim = GetComponent("Animator");
 if(isAttacking)movementState = MState.Attacking;
if(!isAttacking){
////////////////////////////////////
/////Determine Movement State///////
////////////////////////////////////
pos = transform.position;
if(!inEditor){
	if(posPrev == pos) movementState = MState.Idle;
		else movementState = MState.Walking;
}
} 
posPrev = transform.position;
if(angle > 360) angle = 0;
if(!inEditor)angle = Mathf.Abs(motorScript.angle - 180);
if(angle > 68 && angle < 112) moveDirection = Direction.Up;
if(motorScript.movementType == MovementType.eightWay)if(angle <68 && angle > 23) moveDirection = Direction.UpRight;
if(angle < 23 && angle >= 0 || angle <= 360 && angle > 338) moveDirection = Direction.Right;
if(motorScript.movementType == MovementType.eightWay)if(angle > 293 &&  angle < 338) moveDirection = Direction.DownRight;
if(angle > 248 && angle < 293) moveDirection = Direction.Down;
if(motorScript.movementType == MovementType.eightWay)if(angle > 203 && angle < 248) moveDirection = Direction.DownLeft;
if(angle > 158 && angle < 203) moveDirection = Direction.Left;
if(motorScript.movementType == MovementType.eightWay)if(angle > 112 &&  angle < 158) moveDirection = Direction.UpLeft;
	switch(moveDirection){
		case Direction.Up :
			Up();
		break;
		case Direction.UpRight :
			UpRight();
		break;
		case Direction.Right :
			Right();
		break;
		case Direction.DownRight :
			DownRight();
		break;
		case Direction.Down :
			Down();
		break;
		case Direction.DownLeft :
			DownLeft();
		break;
		case Direction.Left :
			Left();
		break;
		case Direction.UpLeft:
			UpLeft();
		break;
	}
	if(inEditor){
	anim.Update(Time.deltaTime);
	}
	
	
}

function LateUpdate(){
	if(coolDownCount > 0){
	coolDownCount--;
} else{
	isAttacking = false;
	motorScript.isAttacking = false;
	coolDownCount = 0;	
}
}
///////////////////////////////
////Directional Functions//////
///////////////////////////////
function Up(){
	if(movementState == MState.Idle)anim.Play("idle_up");
		else if (movementState == MState.Walking)anim.Play("walk_up");
			else if (movementState == MState.Attacking)anim.Play("attack_up");
}
function UpRight(){
	if(movementState == MState.Idle)anim.Play("idle_upRight");
		else if (movementState == MState.Walking)anim.Play("walk_upRight");
			else if (movementState == MState.Attacking)anim.Play("attack_upRight");
}
function Right(){
	if(movementState == MState.Idle)anim.Play("idle_right");
		else if (movementState == MState.Walking)anim.Play("walk_right");
			else if (movementState == MState.Attacking)anim.Play("attack_right");
}
function DownRight(){
	if(movementState == MState.Idle)anim.Play("idle_downRight");
		else if (movementState == MState.Walking)anim.Play("walk_downRight");
			else if (movementState == MState.Attacking)anim.Play("attack_downRight");
}
function Down(){
	if(movementState == MState.Idle)anim.Play("idle_down");
		else if (movementState == MState.Walking)anim.Play("walk_down");
			else if (movementState == MState.Attacking)anim.Play("attack_down");
}
function DownLeft(){
	if(movementState == MState.Idle)anim.Play("idle_downLeft");
		else if (movementState == MState.Walking)anim.Play("walk_downLeft");
			else if (movementState == MState.Attacking)anim.Play("attack_downLeft");
}
function Left(){
	if(movementState == MState.Idle)anim.Play("idle_left");
		else if (movementState == MState.Walking)anim.Play("walk_left");
			else if (movementState == MState.Attacking)anim.Play("attack_left");
}
function UpLeft(){
	if(movementState == MState.Idle)anim.Play("idle_upLeft");
		else if (movementState == MState.Walking)anim.Play("walk_upLeft");
			else if (movementState == MState.Attacking)anim.Play("attack_upLeft");
}

function Attack(){
	movementState = MState.Attacking;
	isAttacking = true;
	coolDownCount = coolDown;
}