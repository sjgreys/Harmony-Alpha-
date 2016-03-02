#pragma strict
// JS example.
enum IngredientUnit { Spoon, Cup, Bowl, Piece }

// Custom serializable class
class Ingredient extends System.Object {
    var name : String;
    var amount : int = 1;
    var unit : IngredientUnit;
}

var potionResult : Ingredient;
var potionIngredients : Ingredient[];

function Update () {
    // Update logic here...
}

// JS example.

@CustomPropertyDrawer(Ingredient)
class IngredientDrawer extends PropertyDrawer {
    
    // Draw the property inside the given rect
    function OnGUI (position : Rect, property : SerializedProperty, label : GUIContent) {
        // Using BeginProperty / EndProperty on the parent property means that
        // prefab override logic works on the entire property.
        EditorGUI.BeginProperty (position, label, property);
        
        // Draw label
        position = EditorGUI.PrefixLabel (position, GUIUtility.GetControlID (FocusType.Passive), label);
        
        // Don't make child fields be indented
        var indent = EditorGUI.indentLevel;
        EditorGUI.indentLevel = 0;
        
        // Calculate rects
        var amountRect = new Rect (position.x, position.y, 30, position.height);
        var unitRect = new Rect (position.x+35, position.y, 50, position.height);
        var nameRect = new Rect (position.x+90, position.y, position.width-90, position.height);
        
        // Draw fields - passs GUIContent.none to each so they are drawn without labels
        EditorGUI.PropertyField (amountRect, property.FindPropertyRelative ("amount"), GUIContent.none);
        EditorGUI.PropertyField (unitRect, property.FindPropertyRelative ("unit"), GUIContent.none);
        EditorGUI.PropertyField (nameRect, property.FindPropertyRelative ("name"), GUIContent.none);
        
        // Set indent back to what it was
        EditorGUI.indentLevel = indent;
        
        EditorGUI.EndProperty ();
    }
}
class RangeAttribute extends PropertyAttribute {
    var min : float;
    var max : float;
    
    function RangeAttribute (min : float, max : float) {
        this.min = min;
        this.max = max;
    }
}

// Tell the RangeDrawer that it is a drawer for properties with the RangeAttribute.
@CustomPropertyDrawer (RangeAttribute)
class RangeDrawer extends PropertyDrawer {
    
    // Draw the property inside the given rect
    function OnGUI (position : Rect, property : SerializedProperty, label : GUIContent) {
        
        // First get the attribute since it contains the range for the slider
        var range : RangeAttribute = attribute as RangeAttribute;
        
        // Now draw the property as a Slider or an IntSlider based on whether it's a float or integer.
        if (property.propertyType == SerializedPropertyType.Float)
            EditorGUI.Slider (position, property, range.min, range.max, label);
        else if (property.propertyType == SerializedPropertyType.Integer)
            EditorGUI.IntSlider (position, property, range.min, range.max, label);
        else
            EditorGUI.LabelField (position, label.text, "Use Range with float or int.");
    }
}
