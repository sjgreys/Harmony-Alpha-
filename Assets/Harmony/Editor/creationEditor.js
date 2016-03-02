import System.Collections.Generic;
class CreationTool extends EditorWindow {
@MenuItem ("Harmony/Garden")
    static function ShowWindow () {
        EditorWindow.GetWindow (CreationTool);
    }  



/////////////////////////////////////
///////////Initial Vars//////////////
///////////////////////////////////// 
var scan : boolean;
var harmonySkin : GUISkin;
var selected : int = 0;
private var prevSelection : int;
var creation : List.<String>;
var focus : Transform;
var character : Transform;
var characterScript : motorControl;
var animScript : animationControl;
public var cam : Camera;
private var editorView : Rect;
var dropDownY : float;
var zoom : float = 1;
var autoRotation : boolean;
var animSpeed : float;
private var tempZoom : float;
var drawCamera : boolean = true;
var canPull : boolean;
	
var floorOrigin : Rect;
var matrixOrigin : Matrix4x4;

/////////////////////////////////////
//////////Character Core/////////////
///////////////////////////////////// 
enum CreationType {Character, Creature, Item, Weapon, Shield, Armor, Vehicle}
var creationType : CreationType;
var leftScroll : Vector2;
  	var objName : String;
    var speed : int = 1;
    var rotationControl : boolean;
    var smoothTurn : boolean;
    var turnSpeed : int = 1;
    var lockedMovement : boolean;
    var possessed : boolean;
    
/////////////////////////////////////
//////////Character Stats////////////
/////////////////////////////////////	
    var level : int = 0;
    var health : int= 0;
	var defense : int= 0;
	var attack : int = 0;
	var intelligence : int = 0;
	var strength : int = 0;
	var dexterity : int = 0;
	var luck : int = 0;
    var equippedWeapon : Transform;
    var weaponName : String;   
	 var style : GUIStyle;
	 var mType : MovementType;
	 var mState :  MState;
	 var mDir : Direction;


/////////////////////////////////////
////////////Weapon Stats/////////////
/////////////////////////////////////
	var timeline : float;
	var endPos : Vector3;
	var endRot : Vector3;

//////////////////////////////////////
/////////////Wrappers/////////////////
//////////////////////////////////////
var characterPanel : Rect;
var leftPanel : Rect;
var leftHeader : Rect;
var rightPanel : Rect;
var rightHeader : Rect;
var cpHeader : Rect;
var cpDropMenu : Rect;
var cpFooter : Rect;

	
//////////////////////////////////////
//////////////Styles//////////////////
//////////////////////////////////////
var centeredStyle : GUIStyle;	 	 

//////////////////////////////////////
///////////////Lists//////////////////
//////////////////////////////////////
var creationArray : String[];
var tagScript : creationTag;

//////////////////////////////////////
///////////Icon Manager///////////////
//////////////////////////////////////
var iconManager : Transform;//Resources.Load("GUIIconManager", Transform);
var iconScript : iconManager;
var aSprite : Sprite;
var harmonyTexture : Texture2D;
var gardenIconTexture : Texture2D;


function QuickLaunch (){
	if (GUI.Button(Rect(16, 16, 32, 32), "G")){
		EditorWindow.GetWindow (CreationTool);
	}
}
//---------------------------------------------------------------------------------------------------------------------------------------/
	 	 	 	 	 	 
function OnEnable(){	 
	 zoom = 1;
	 	floorOrigin = new Rect(0,0,Screen.width, Screen.height);
	 	scan = true;
	 	ResetVariables();
	 	
}  
	 
	 
	 
function OnGUI () {
if(selected == 0)ResetVariables(); 
var windowRect : Rect = new Rect(16, 16, 128, 256);
	windowRect = GUILayout.Window(0,windowRect, QuickLaunch, "", GUILayout.Width(100));
if(character == null || prevSelection != selected)scan = true;
  //////**Script Manager for each object to handle of adding or removing scripts and setting those new variables to the the stored
  //////ones kept in the manager at all times. And a Prefab and Editor Selection box for choosing which to edit	
    
    if(scan){
    
    	/////////////////////////////////////////
    	//////////////List Check/////////////////
    	/////////////////////////////////////////
    	creation = List.<String>();
    	
    	/////////////////////////////////////////
    	///////////////List Set//////////////////
    	/////////////////////////////////////////
    		var empty : String = "-Select Creation-";
  			creation.Add(empty); 
  	}
    
	
  	if(selected != prevSelection || scan){
  		var tagTemp : creationTag[] = GameObject.FindObjectsOfType(creationTag);
			for(var c = 0; c < tagTemp.Length; c++){
				if(!creation.Contains(tagTemp[c].name))creation.Add(tagTemp[c].transform.name);
			}
		for (var item in creation){
			Debug.Log(item);
		}
		creation.Add("-New-");
		
creationArray = creation.ToArray();
if(selected != 0) tagScript = GameObject.Find(creationArray[selected]).GetComponent("creationTag");
	}
	
    
matrixOrigin = GUI.matrix;
	 
	 
///////////////////////////////////// Quick Access Rect variables for the different areas of the Editor
/////////////Containers//////////////
/////////////////////////////////////
characterPanel  = new Rect(Screen.width / 4,2, Screen.width/2, Screen.height - 28);
cpFloorn = new Rect(0, 0, Screen.width, Screen.height);
leftPanel = new Rect(3,3, Screen.width/4 - 6, Screen.height - 28);
leftHeader = new Rect(3, 3, Screen.width / 4 -6, 32);
rightPanel =  new Rect(Screen.width - Screen.width / 4 + 1,3, Screen.width/4 - 5, Screen.height - 28);
rightHeader = new Rect(Screen.width - Screen.width / 4 + 1, 3,  Screen.width/4 - 5, 32);
cpHeader = new Rect(characterPanel.x, characterPanel.y - 2, characterPanel.width, 32);
cpDropMenu = new Rect(characterPanel.x, characterPanel.y - 256, characterPanel.width, 256);
cpFooter = new Rect(characterPanel.x, characterPanel.height - 56, characterPanel.width, 96);




/////////////////////////////////////
///////////Icon Manager//////////////
/////////////////////////////////////
iconManager = GameObject.Find("GUIIconManager").transform;//Resources.Load("GUIIconManager", Transform);
iconScript = iconManager.GetComponent("iconManager");
aSprite = iconScript.avatar;
harmonyTexture = Resources.Load("Editor/harmonyIcon", Texture2D);
gardenIconTexture = Resources.Load("Editor/harmonyIconGarden", Texture);


/////////////////////////////////////
////////////Components///////////////
/////////////////////////////////////
if(selected != prevSelection || scan){
if(creationType == CreationType.Character && selected != 0){
	 		character = GameObject.Find(creationArray[selected]).transform;	 	
   			animScript = character.GetComponent("animationControl");	
	 		characterScript = character.GetComponent("motorControl");
	 		if(autoRotation){
	 			animScript.inEditor = true;
	 			animScript.angle += 1 * animSpeed;
	 		} else {
	 			animScript.inEditor = false;
	 		}
   		}
}
   
   
  	
  	/////////////////////////////////
 	//////////Set GUI Skin///////////
 	/////////////////////////////////
  
		GUI.skin = iconScript.harmonySkin;

 
/////////////////////////////////////
///////////////Styles////////////////
/////////////////////////////////////
centeredStyle = GUI.skin.GetStyle("Label");	
    
   ///////////////////////////////////
   /////////Draw Core Controls////////
   ///////////////////////////////////
  
   DrawPanels();
  if(selected == prevSelection){ 
   if(creationType == CreationType.Character)DrawCharacter();
   if(creationType == CreationType.Item)DrawItems(); 
   if(creationType == CreationType.Weapon)DrawWeapons();
}
   	   
 	 
     
     
    /////////////////////////////////////////
    ///////////Set Current Active////////////
    /////////////////////////////////////////
    
    if(selected > 0){
    	var curSelected : Transform = GameObject.Find(creationArray[selected]).transform;
    	var curScript : creationTag = curSelected.GetComponent("creationTag");
    	if(curScript.inEditor == false)curScript.posOrigin = curSelected.position;
    	curScript.inEditor = true;
    }
    
    if(selected != prevSelection){
   	 	if(prevSelection != 0)GameObject.Find(creationArray[prevSelection]).GetComponent("creationTag").inEditor = false;
    } else {
    	if(selected != 0)PullVariables();
    }
    
    /////////////////////////////////////////
    ///////////////List Vars/////////////////
    /////////////////////////////////////////
   
  //if(selected != prevSelection && prevSelection != 0)PushVariables(); 
  
  if(prevSelection != selected) scan = true;
  	//else scan = false;
    prevSelection = selected;
    

initialize = false;







//These Sections are for what is available to edit within the editor based on the type of creation that is selected.

///////////Characters///////////
//load motorController
//load animController
//load equpimentHandler

///////////Creatures////////////
//load motorController
//load animController
//load equpimentHandler

/////////////Items//////////////
//load itemBase
//load motorController
//load animController
//load equpimentHandler

////////////Weapons/////////////
//load weaponBase

////////////Armors//////////////
//load armorBase

///////////Shields//////////////
//load shieldBase

//////////Vehicles//////////////
//load motorController
//load animController
//load equpimentHandler
//load vehicleBase



    }
    
//---------------------------------------------------------------------------------------------------------------------------------------/
    
    function OnInspectorUpdate() {
	    	Repaint();
	}
	
////////////////////////////////////
//////////Draw Headers//////////////
////////////////////////////////////    
	function DrawPanels(){
	
/////////////////////////////////
///////Background Panels/////////
/////////////////////////////////
    GUI.color = Color32(0, 140, 0, 255); 
 	GUI.DrawTexture( new Rect(0,0, Screen.width, Screen.height), EditorGUIUtility.whiteTexture );
 	GUI.color = Color.black; 
 	GUI.DrawTexture( new Rect(1,1, Screen.width - 2, Screen.height - 24), EditorGUIUtility.whiteTexture );
	
/////////////////////////////////
///////Draw L & R Panels/////////
/////////////////////////////////
 	GUI.color = Color32(40,40,40,255); 
 	GUI.DrawTexture(rightPanel, EditorGUIUtility.whiteTexture );//Left(Stats Panel)
 	GUI.color = Color32(20,20,20,200);
 	GUI.color = Color32(40,40,40,255);
 	GUI.DrawTexture(leftPanel, EditorGUIUtility.whiteTexture );//Left(Stats Panel)
 	GUI.color = Color32(20,20,20,200);
 	GUI.DrawTexture(new Rect(leftPanel.x + 4, leftPanel.y + 3, leftPanel.width -8, leftPanel.height - 64), EditorGUIUtility.whiteTexture );//Left(Stats Panel)
 	
/////////////////////////////////
/////////Draw Headers////////////
/////////////////////////////////
 
    GUI.color = Color32(40,40,40,100); 
     
 	GUI.DrawTexture(cpDropMenu, EditorGUIUtility.whiteTexture );//Center(character window)
 	GUI.DrawTexture(cpHeader, EditorGUIUtility.whiteTexture );//Center(character window)
 	
 	GUI.DrawTexture(cpFooter, EditorGUIUtility.whiteTexture );//Center(character window)
 	GUI.color = Color.white;  
    EditorGUI.LabelField(cpHeader, creationType + " Preview", centeredStyle);
    EditorGUI.LabelField(rightPanel, creationType + " Stats", centeredStyle);
    
///////////////////////////////////
////////////Draw Logos/////////////
///////////////////////////////////
	GUI.color = Color.white;
	GUI.Label(Rect(leftPanel.x + 2, leftPanel.height - 56, 64, 64), iconScript.harmonyIcon);
	GUI.color = Color32(255, 255, 255, 190);	
	GUI.Label(Rect(rightPanel.x + rightPanel.width - 120, rightPanel.height - 120, 128, 128), iconScript.gardenIcon);
	GUI.color = Color.white;   
	
 	GUI.BeginGroup (Rect (characterPanel));
 	
 	
 	
/////////////////////////////////
///////Draw Camera Render////////
/////////////////////////////////
 	GUI.color = Color32(20,20,20,255);
 	if (Event.current.type == EventType.Repaint)
     {
     	cam = GameObject.Find("characterEditorCamera").transform.GetComponent(Camera);
     	var camScript : characterEditorCamera = cam.GetComponent("characterEditorCamera");
     	camScript.offset.z = 10 - zoom / 1.25;
     	editorView = new Rect(characterPanel.x, characterPanel.y - 56, characterPanel.width, characterPanel.height + 32);
    	editorView.y += 16;
 		
        cam.pixelRect = editorView;
    	cam.Render();
     }
     
     
 	
////////////////////////////////////////
///////Character Preview Controls///////
////////////////////////////////////////
GUI.color = Color.white;
     mDir = EditorGUI.EnumPopup(Rect(characterPanel.x - characterPanel.width / 2, characterPanel.height - 56,  characterPanel.width / 2 ,16), "Move Direction",mDir);
     GUI.Label(Rect(characterPanel.x - characterPanel.width / 2,characterPanel.height - 40,characterPanel.width / 2 - 8,20), "Zoom");	
     tempZoom = EditorGUI.Slider(Rect(2,characterPanel.height - 24,characterPanel.width / 2 - 8,20), zoom, 1, 10);
     zoom = tempZoom;//Mathf.Lerp(zoom, tempZoom, .4 * Time.delatTime);
     autoRotation = EditorGUI.Toggle(Rect(characterPanel.width / 2 + 16, characterPanel.height - 56,  characterPanel.width / 2 ,16), "Auto Rotate", autoRotation);
     GUI.Label(Rect(characterPanel.width / 2,characterPanel.height - 40,characterPanel.width / 2 - 8,20), "Animation Speed");	
     animSpeed = EditorGUI.Slider(Rect(characterPanel.width / 2,characterPanel.height - 24,characterPanel.width / 2 - 8,20), animSpeed, 1, 5);

    
/////////////////////////////////
/////////Draw Buttons////////////
/////////////////////////////////
 	GUI.color = Color.white;//Color32(100, 200, 100, 255);
    GUI.Button(new Rect(cpHeader.width -128, cpHeader.y - 2, 32, 32), "A");
    GUI.Button(new Rect(cpHeader.width - 96, cpHeader.y - 2, 32, 32), "W");
    GUI.Button(new Rect(cpHeader.width - 64, cpHeader.y - 2, 32, 32), "E");
    var menuDropped : boolean;
    if(GUI.Button(new Rect(cpHeader.width - 32, cpHeader.y - 2, 32, 32), iconScript.settingsIcon)){
    	GUI.Button(new Rect(cpHeader.width - 32, cpHeader.y + 32, 32, 32), iconScript.settingsIcon);
    	if(menuDropped) menuDropped = false;
    		else menuDropped = true;
    }	
    if(menuDropped)dropDownY = 256;
    	else dropDownY = 0;
    cpDropMenu.y = dropDownY;
    GUI.EndGroup();
    GUI.color = Color.white;
   GUI.Label(Rect(leftPanel.x + leftPanel.width -160, leftPanel.height - 32, 96, 32), "Type"); 
    GUI.Label(Rect(leftPanel.x + leftPanel.width -160, leftPanel.height - 60, 96, 32), "Creation"); 
   creationType = EditorGUI.EnumPopup(Rect(leftPanel.x + leftPanel.width -160, leftPanel.height - 16, 64, 32), creationType);	 	
	 selected = EditorGUI.Popup(new Rect(leftPanel.x + leftPanel.width -160, leftPanel.height - 44, 64, 32), selected, creationArray);
	if(GUI.Button(Rect(leftPanel.x + leftPanel.width -68, leftPanel.height - 54, 52, 52), iconScript.updateIcon)){
		PushVariables();
	}
/////////////////////////////////
///////Draw CE Background////////
/////////////////////////////////
 	/*GUI.color = Color.white;
 	GUI.BeginGroup(characterPanel);


///////////////////////////////////// 
//////////Window Scaling/////////////
/////////////////////////////////////    
		var scale : Matrix4x4 = Matrix4x4.Scale(new Vector3(zoom, zoom, 1.0));
		var translation : Matrix4x4 = Matrix4x4.TRS(Vector2(0,21), Quaternion.identity, Vector3.one);
		//GUI.matrix = translation * scale * translation.inverse; 
 	GUI.color = Color.white;
 	//GUI.DrawTexture(characterPanel, EditorGUIUtility.whiteTexture );//Center(character window)
 	var ceBackground : Texture2D = Resources.Load("Editor/CharacterEditor/characterEditor_background", Texture2D);
 	//GUI.DrawTexture(new Rect(cpFloor.x - characterPanel.x, cpFloor.y, cpFloor.width, cpFloor.height), ceBackground);
 	

/////////////////////////////////
/////////////Avatar//////////////
/////////////////////////////////
 	//GUI.Label(Rect(characterPanel.width / 2, characterPanel.height/ 2, 64,64), aSprite);
//    var spriteRect : Rect = GUILayoutUtility.GetRect(c.width, c.height);
 	
 	GUI.EndGroup();
 	GUI.matrix = matrixOrigin;*/
    
    
	}
    

////////////////////////////////////
///////Display Panel functions//////
////////////////////////////////////
    
    public function DrawCharacter(){
//These Sections are for what is available to display based on the type of creation that is selected.



///////////Characters//////////////
//display motorController settings
//display animController settings
//display equpimentHandler toggle and settings
///////////////////////////////////////////////


////////////////////////////////////////////////////Left Panel Components///////////////////////////////////////////////////////////////
leftScroll =  GUI.BeginScrollView (Rect (leftPanel.x, leftPanel.y + 6, leftPanel.width, leftPanel.height - 78), leftScroll, Rect (leftPanel.x, leftPanel.y, leftPanel.width - 32, leftPanel.height));
	
   GUI.BeginGroup (Rect (leftPanel));
   //EditorGUIUtility.fieldWidth = 200;   
	
	   
    	
   	GUI.color = Color32(40,40,40,255); 
 	GUI.DrawTexture(Rect(leftHeader.x, leftHeader.y, leftHeader.width - 16, 16), EditorGUIUtility.whiteTexture );//Center(character window) 
     GUI.color = Color.white;  
    EditorGUI.LabelField(leftPanel, creationType + " Core", centeredStyle); 
    
    
//////////////////////////////////
////////Draw Core Controls////////
//////////////////////////////////
		 GUILayout.BeginVertical();
	//EditorGUI.DrawPreviewTexture(Rect(leftPanel.x + 2, leftPanel.height - 64, 64, 64), harmonyTexture);
	
	GUI.Label(Rect(leftPanel.x + 2, leftPanel.y + 64,leftPanel.width - 16,16), "Speed", centeredStyle);
	if(scan)GUI.Label(Rect(leftPanel.x + leftPanel.width - 96 + 3, leftPanel.y + 8, 32, 32), iconScript.loadIcon);  

   
 
	speed = EditorGUI.Slider(Rect(leftPanel.x + 2, leftPanel.y + 80,leftPanel.width - 16,16), speed, 1, 10);
	mType = EditorGUI.EnumPopup(Rect(leftPanel.x + 2, leftPanel.y + 112, leftPanel.width - 16, 16), "Move Type",mType);
	mState = EditorGUI.EnumPopup(Rect(leftPanel.x + 2, leftPanel.y + 144, leftPanel.width - 16, 16), "Move State",mState);
	rotationControl = EditorGUI.Toggle(Rect(leftPanel.x + 2, leftPanel.y + 176,leftPanel.width - 6,16), "Rotation Control", rotationControl);
	if(!rotationControl) GUI.enabled = false;
	smoothTurn = EditorGUI.Toggle(Rect(leftPanel.x + 2, leftPanel.y + 208,leftPanel.width - 16,16), "Smooth Turn", smoothTurn);
	if(!smoothTurn) GUI.enabled = false;
	EditorGUI.LabelField(Rect(leftPanel.x + 2, leftPanel.y + 224,leftPanel.width - 16,16), "Turn Speed", centeredStyle);
	turnSpeed = EditorGUI.Slider(Rect(leftPanel.x + 2, leftPanel.y + 240,leftPanel.width - 16,16), turnSpeed, 1, 10);
	 GUI.enabled = true;
	 lockedMovement = EditorGUI.Toggle(Rect(leftPanel.x + 2, leftPanel.y + 272,leftPanel.width - 16,16), "Locked Movement", lockedMovement);
	 posessed = EditorGUI.Toggle(Rect(leftPanel.x + 2, leftPanel.y + 304,leftPanel.width - 16,16), "Possession", possessed);
		GUILayout.EndVertical();	
	GUI.Label(Rect(leftPanel.x + 2, leftPanel.y + 32,leftPanel.width - 32,16), "Name", centeredStyle);
	objName = GUI.TextField(Rect(leftPanel.x + 64, leftPanel.y + 32,leftPanel.width - 128, 24), objName);
	GUI.EndGroup();
   	GUI.EndScrollView ();

////////////////////////////////////////////////////Right Panel Components///////////////////////////////////////////////////////////////
    
     
     //////////////////////////////////
     ///////Draw Equipment Boxes///////
     //////////////////////////////////
     GUI.color = Color32(25.5,25.5,25.5,200); 
     var EQBox1 : Rect = new Rect(rightPanel.x + rightPanel.width / 10 -8, rightPanel.height - 64, 64, 64);
     var EQBox2 : Rect = new Rect(rightPanel.x + rightPanel.width / 10 + 63, rightPanel.height - 64, 64, 64);
     var EQBox3 : Rect = new Rect(rightPanel.x + rightPanel.width / 10 + 134, rightPanel.height - 64, 64, 64);
     //BackBox
     GUI.DrawTexture(EQBox1, EditorGUIUtility.whiteTexture );//Weapon Box
     GUI.DrawTexture(EQBox2, EditorGUIUtility.whiteTexture );//Armor Box
     GUI.DrawTexture(EQBox3, EditorGUIUtility.whiteTexture );//Item Box
     //ForeBox
     GUI.color = Color32(100,120,100,100); 
     GUI.DrawTexture(Rect(EQBox1.x + 1, EQBox1.y + 1, EQBox1.width - 2, EQBox1.height - 2), EditorGUIUtility.whiteTexture );//Weapon Box
     GUI.DrawTexture(Rect(EQBox2.x + 1, EQBox2.y + 1, EQBox2.width - 2, EQBox2.height - 2), EditorGUIUtility.whiteTexture );//Armor Box
     GUI.DrawTexture(Rect(EQBox3.x + 1, EQBox3.y + 1, EQBox3.width - 2, EQBox3.height - 2), EditorGUIUtility.whiteTexture );//Item Box
     GUI.color = Color.white; 
     GUI.Label(Rect(EQBox1.x + 3, EQBox1.y, EQBox1.width + 8, EQBox1.height), iconScript.weaponIcon);
     GUI.Label(Rect(EQBox2.x + 3, EQBox2.y, EQBox2.width + 8, EQBox2.height), iconScript.shieldIcon);
     GUI.Label(Rect(EQBox3.x + 3, EQBox1.y, EQBox3.width + 8, EQBox3.height), iconScript.itemIcon);
    
    
    //////////////////////////////////
    ////////Draw Stat Controls////////
    //////////////////////////////////
    GUI.color = Color.white;  
    level = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 32, rightPanel.width - 8, 16), "Level", level);    	
    health = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 64, rightPanel.width - 8, 16), "Health", health);
	defense = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 96, rightPanel.width - 8, 16), "Defense", defense);
	attack = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 128, rightPanel.width - 8, 16), "Attack", attack);
	intelligence = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 160, rightPanel.width - 8, 16), "Intelligence", intelligence);
	strength = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 192, rightPanel.width - 8, 16), "Strength", strength);
	dexterity  = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 224, rightPanel.width - 8, 16), "Dexterity", dexterity);
	luck = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 256, rightPanel.width - 8, 16), "Luck", luck);
    

	}
 function ResetVariables(){
    	
    	speed = 1;
    	mType = MovementType.fourWay;
    	rotationControl = false;
    	smoothTurn = false;
    	turnSpeed = 1;
    	lockedMovement = false;
    	possessed = false;
    	
    	mState =  MState.Idle;
    	mDir = Direction.Up;
    	
    	level = 1;
    	health = 0;
    	attack = 0;
    	defense = 0;
    	dexterity = 0;
    	strength = 0;
    	intelligence = 0;
    	luck = 0;
    	creationType = CreationType.Character;
    	
    	objName = "-Enter Name-";
    }
    
    function PushVariables(){
    if(creationType == CreationType.Character){
    	characterScript.speed = speed;
    	characterScript.movementType = mType; 
    	characterScript.rotationControl = rotationControl;
    	characterScript.smoothTurn = smoothTurn;
    	characterScript.turnSpeed = turnSpeed;
    	characterScript.lockedMovement = lockedMovement; 
    	characterScript.possessed = possessed;
      
    	animScript.movementState = mState;
    	if(!autoRotation)animScript.moveDirection = mDir;
    
    	characterScript.level = level;
    	characterScript.health = health;
    	characterScript.attack = attack;
    	characterScript.defense = defense;
    	characterScript.dexterity = dexterity;
    	characterScript.strength = strength;
    	characterScript.intelligence = intelligence;
    	characterScript.luck = luck;
    }
    	if(creationType == CreationType.Item){
    		var itemScript : itemBase = GameObject.Find(creationArray[selected]).transform.GetComponent("itemBase");
    		itemScript.level = level;
    		itemScript.health = health;
    		itemScript.attack = attack;
    		itemScript.defense = defense;
    		itemScript.dexterity = dexterity;
    		itemScript.strength = strength;
    		itemScript.intelligence = intelligence;
    		itemScript.luck = luck;
    	}
    	
    	if(creationType == CreationType.Weapon){
    		var weaponScript : weaponBase = GameObject.Find(creationArray[selected]).transform.GetComponent("weaponBase");
    		weaponScript.timeline = timeline;
    		weaponScript.endPosition = endPos;
    		weaponScript.endRotation = endRot;
    	}
    	
    	tagScript.type = creationType.ToString();
    	tagScript.objectName = objName;
    }
    
    function PullVariables(){
    
    
    
    /////////////////////////////////
    ////////Character Variables/////////
    /////////////////////////////////
    if(creationType == CreationType.Character){
    	speed = characterScript.speed;
    	mType = characterScript.movementType;
    	rotationControl = characterScript.rotationControl;
    	smoothTurn = characterScript.smoothTurn;
    	turnSpeed = characterScript.turnSpeed;
    	lockedMovement = characterScript.lockedMovement;
    	possessed = characterScript.possessed;
    	
    	mState =  animScript.movementState;
    	mDir = animScript.moveDirection;
    	
    	level = characterScript.level;
    	health = characterScript.health;
    	attack = characterScript.attack;
    	defense = characterScript.defense;
    	dexterity = characterScript.dexterity;
    	strength = characterScript.strength;
    	intelligence = characterScript.intelligence;
    	luck = characterScript.luck;
    	
    	}
    	
    	
    	/////////////////////////////////
    	/////////Item Variables//////////
    	/////////////////////////////////
    	if(creationType == CreationType.Item){
    		var itemScript : itemBase = GameObject.Find(creationArray[selected]).transform.GetComponent("itemBase");
    		level = itemScript.level;
    		health = itemScript.health;
    		attack = itemScript.attack;
    		defense = itemScript.defense;
    		dexterity = itemScript.dexterity;
    		strength = itemScript.strength;
    		itelligence = itemScript.intelligence;
    		luck = itemScript.luck;
    	}
    	
    	
    	/////////////////////////////////
    	////////Weapon Variables/////////
    	/////////////////////////////////
    	if(creationType == CreationType.Weapon){
    		var weaponScript : weaponBase = GameObject.Find(creationArray[selected]).transform.GetComponent("weaponBase");
    		timeline = weaponScript.timeline;
    		endPos = weaponScript.endPosition;
    		endRot = weaponScript.endRotation;
    	}
    	
    	/////////////////////////////////
    	//////////Tag Variables//////////
    	/////////////////////////////////
    	objName = tagScript.objectName;
    	var targetType : CreationType = System.Enum.Parse( CreationType, tagScript.type);
    	
    	//var targetType : String = tagScript.type;
    	Debug.Log("Target Type is " + targetType);
    	
    	creationType = targetType;
    	Debug.Log("Creation Type is " + creationType);
    	canPull = false;
    }
	public function DrawCreatures(){
	///////////Creatures////////////
	//display motorController settings
	//display animController settings
	//display equpimentHandler toggle and settings


	}

	public function DrawItems(){
	/////////////Items//////////////
	//display itemBase settings
	//display motorController settings
	//display animController settings
	//display equpimentHandler toggle and settings
	
	//Right Panel
	GUI.Label(Rect(leftPanel.x + 2, leftPanel.y + 32,leftPanel.width - 32,16), "Name", centeredStyle);
	objName = GUI.TextField(Rect(leftPanel.x + 64, leftPanel.y + 32,leftPanel.width - 128, 24), objName);
	
	//Left Panel
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 16, rightPanel.width - 16,16), "Level");
	level = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 32, rightPanel.width - 16,16), level, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 48, rightPanel.width - 16,16), "Health");
	health = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 64, rightPanel.width - 16,16), health, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 80, rightPanel.width - 16,16), "Defense");
	defense = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 96, rightPanel.width - 16,16), defense, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 112, rightPanel.width - 16,16), "Attack");
	attack = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 128, rightPanel.width - 16,16), attack, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 144, rightPanel.width - 16,16), "Intelligence");
	intelligence = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 160, rightPanel.width - 16,16), intelligence, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 176, rightPanel.width - 16,16), "Strength");
	strength = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 192, rightPanel.width - 16,16), strength, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 208, rightPanel.width - 16,16), "Dexterity");
	dexterity = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 224, rightPanel.width - 16,16), dexterity, -10, 10);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 240, rightPanel.width - 16,16), "luck");
	luck = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 256, rightPanel.width - 16,16), luck, -10, 10);

	}

	public function DrawWeapons(){
	////////////Weapons/////////////
	//display weaponBase settings
	//GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 16, rightPanel.width - 16,16), "Attack");
	attack = EditorGUI.IntField(Rect(rightPanel.x + 2, rightPanel.y + 32, rightPanel.width - 16,16), "Attack", attack);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 48, rightPanel.width - 16,16), "Timeline");
	timeline = EditorGUI.Slider(Rect(rightPanel.x + 2, rightPanel.y + 64, rightPanel.width - 16,16), timeline, 0, 1);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 80, rightPanel.width - 16,16), "End Position");
	endPos = EditorGUI.Vector3Field(Rect(rightPanel.x + 2, rightPanel.y + 96, rightPanel.width - 16,16), "", endPos);
	GUI.Label(Rect(rightPanel.x + 2, rightPanel.y + 80, rightPanel.width - 112,16), "End Rotation");
	endRot = EditorGUI.Vector3Field(Rect(rightPanel.x + 2, rightPanel.y + 128, rightPanel.width - 16,16), "", endRot);
	
	//For live animation preview
	var weaponScript : weaponBase = GameObject.Find(creationArray[selected]).transform.GetComponent("weaponBase");
    weaponScript.timeline = timeline;
    weaponScript.endPosition = endPos;
    weaponScript.endRotation = endRot;
	}

	public function DrawArmors(){
	////////////Armors//////////////
	//display armorBase settings


	}

	public function DrawShields(){
		///////////Shields//////////////
	//display shieldBase settings


	}

	public function DrawVehicles(){
	//////////Vehicles//////////////
	//display motorController settings
	//display animController settings
	//display equpimentHandler toggle and settings
	//display vehicleBase settings
	}


}




