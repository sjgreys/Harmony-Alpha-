#pragma strict
var fromWorld : boolean;
var target : Transform;
var previewStartTime : double;
var anim : Animator;
var animClip : AnimationClip;
var animSpeed : float;
@script ExecuteInEditMode()
function Start () {
fromWorld = false;

Destroy(gameObject, .4);
}

function Update () {
StartPreview();
/*anim = GetComponent(Animator);
//animClip = anim.Clip("teleport");

if(fromWorld){
	anim.Play("teleport");
 if (anim.GetCurrentAnimatorStateInfo(0).IsName("teleport")){
 	target.gameObject.layer = 8;
 	Destroy(gameObject);
 }
} else {
	anim.Play("teleport");
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("reverseTeleport")){
 		target.gameObject.layer = 0;
 		Destroy(gameObject);
	}
}*/
}

function StartPreview(){
previewStartTime = EditorApplication.timeSinceStartup;
EditorApplication.update = DoPreview;
}
function DoPreview()
{
Destroy(gameObject, .4);
	var thisObject : GameObject = transform as GameObject;
   var timeElapsed : float = EditorApplication.timeSinceStartup - previewStartTime;
  // animClip.SampleAnimation(gameObject, timeElapsed * .01);
}
 