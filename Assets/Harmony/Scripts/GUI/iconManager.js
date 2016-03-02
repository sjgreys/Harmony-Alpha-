#pragma strict
@script ExecuteInEditMode()
var test : String;
var harmonySkin : GUISkin;
var harmonyIcon : Texture2D;
var gardenIcon : Texture2D;
var settingsIcon : Texture2D;
var avatarSprite : Texture2D;
var weaponIcon : Texture2D;
var shieldIcon : Texture2D;
var itemIcon : Texture2D;
var loadIcon : Texture2D;
var updateIcon : Texture2D;

var blankCreation : Transform;
var menuScript : menuBase;
var avatar : Sprite;
var player : Transform;
var sprites : Sprite[] ;
var spriteSheet : String ;
var curSprite : String;
var tagTemp : creationTag[];
var creation : List.<String>;
function Start(){
	//InvokeRepeating("AvatarUpdate", 0, 1)
}
function Update() {
tagTemp = GameObject.FindObjectsOfType(creationTag);
for(var c = 0; c < tagTemp.Length; c++){
	if(!creation.Contains(tagTemp[c].name))creation.Add(tagTemp[c].transform.name);
}
player = GameObject.Find("Player").transform;
curSprite = player.GetComponent(SpriteRenderer).sprite.name;
avatarSprite = player.GetComponent(SpriteRenderer).sprite.texture;
var avatarRect : Rect = player.GetComponent(SpriteRenderer).sprite.rect;
spriteSheet = AssetDatabase.GetAssetPath( avatarSprite );
avatar = player.GetComponent(SpriteRenderer).sprite;
//avatar = player.GetComponent(SpriteRenderer).sprite.texture;
}
