#pragma strict
import SpriteTile;

var cam : Camera;
var myLevel : TextAsset;
var playerScans : SpriteRenderer[];
var playerFound : boolean;
var player : Transform;
var playerSprite : Sprite;

function Awake () {
	Tile.SetCamera(cam);
	Tile.LoadLevel(myLevel);
	
playerScans = FindObjectsOfType(SpriteRenderer);
for(var x = 0; x < playerScans.length; x++){
	if(playerScans[x].sprite == playerSprite){
	playerFound = true;
		var newPlayer : Transform = Instantiate(player, playerScans[x].transform.position, playerScans[x].transform.rotation);
		cam.transform.parent = newPlayer;
	}
}
}

function Update () {

}