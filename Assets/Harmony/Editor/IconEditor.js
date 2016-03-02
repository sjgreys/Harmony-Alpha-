/*#pragma strict
@CustomEditor(iconManager)
	class IconEditor extends Editor {
	     function OnSceneGUI() {
	     var player : Transform = GameObject.Find("Player").transform;
	     var targetScript : iconManager = GameObject.Find("GUIIconManager").transform.GetComponent("iconManager");
        	//var iconScript : iconManager = GameObject.Find("GUIIconManager").transform.GetComponent("iconManager");
        	var spriteSheet = targetScript.spriteSheet;
        	var sprites = AssetDatabase.LoadAllAssetsAtPath( spriteSheet);
//        	Debug.Log(sprites);        	
        	for(var x = 0; x <= sprites.length; x++){
	if(sprites[x].name == targetScript.avatarSprite.name) targetScript.avatar = sprites[x];
}			Debug.Log(spriteSheet);
        	
        	Debug.Log(spriteSheet);
        		//targetScript.avatar = player.GetComponent(SpriteRenderer).sprite.texture;
        		targetScript.Update();
         }
	}*/