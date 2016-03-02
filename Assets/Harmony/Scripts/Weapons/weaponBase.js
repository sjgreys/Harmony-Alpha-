#pragma strict
@script ExecuteInEditMode()
var name : String;
var attack : float;
var isConstant : boolean;
var inHand : boolean;
var startPos : Vector3;
var animate : boolean;
var animationSpeed : float = 1;
var target : Transform;
@Range (0.0, 1)
var timeline : float;
var rotOrigin : Vector3;
var endRotation : Vector3;
var posOrigin : Vector3;
var endPosition : Vector3;
var dragPosition : Vector3;
var curPos : Vector3;
var propertiesWheel : Transform;
var tagScript : creationTag;
var isAttacking : boolean;
///////////////////////////////
/////Drag and Drop(Editor)/////
///////////////////////////////
var isActive : boolean; //If mouse clicked on weapon

function OnMouseDown(){
isActive = true;
Active();
}
function OnMouseUp(){
//isActive = false;
}


function Awake () {
if(transform == transform.root)posOrigin = transform.position;
	else posOrigin = transform.root.transform.position;
if(transform == transform.root)rotOrigin = transform.localEulerAngles;
	else rotOrigin = transform.root.transform.localEulerAngles;
	
}
function Update () {
if(isAttacking && timeline == 1 && !isConstant) Destroy(gameObject);
tagScript = transform.GetComponent("creationTag");
	tagScript.endPos = endPosition;
////////////////////////////////////////
/////////////Set To Parent//////////////
////////////////////////////////////////
if(!inHand){
if(transform != transform.root){
	posOrigin = Vector3.zero;
	transform.position = transform.parent.position;
	rotOrigin = transform.root.transform.localEulerAngles;
}
if(animate){
	timeline += .1 * animationSpeed;
	if(timeline > 1) timeline = 0;
}

curPos = posOrigin +(endPosition * timeline);
if(transform.parent)transform.position = transform.parent.position + curPos;
	else transform.position = curPos;
transform.localEulerAngles = rotOrigin + endRotation * timeline;

//if(isActive){
//	var newWheel : Transform = Instantiate(propertiesWheel, transform.position, Quaternion.identity);
//} else if(newWheel) Destroy(newWheel.gameObject);
}
}
function UpdatePosition(){
posOrigin = dragPosition;
curPos = posOrigin +((posOrigin + endPosition) * timeline);
	if(transform.parent)transform.position = transform.parent.position + curPos;
	else transform.position = curPos;
}

function Active(){}

function OnSceneGUI(){
	/*if(isActive){
	Handles.BeginGUI();
		var rect : Rect = new Rect(10, 10, 100, 50);
 	GUI.Box(rect, "Button");
     if(Event.current.type == EventType.MouseDown && rect.Contains(Event.current.mousePosition))
     {
       Debug.Log("press");
     }
     }
     Handles.EndGUI();*/
}