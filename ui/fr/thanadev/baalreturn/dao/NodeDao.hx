package fr.thanadev.baalreturn.dao;

import StringTools;
import fr.thanadev.baalreturn.classes.Node;
import js.html.Event;
import js.html.XMLHttpRequest;

class NodeDao {

    private static var _instance:NodeDao = null;

    private function new() {

    }

    public static function getInstance():NodeDao {
        if (_instance == null) {
            _instance = new NodeDao();
        }

        return _instance;
    }

    public function loadNode(nodeIndex:Int, callback:Node -> Void) {
        var node:Node;
        var request = new XMLHttpRequest();

        request.open("GET", "assets/node_" + Std.string(nodeIndex) + ".json", true);

        request.onload = function(e:Event){
            node = Node.fromJson(StringTools.trim(request.response));
            callback(node);
        };

        request.onerror = function(e:Event) {
            trace("Error : Could not find json file : nose_" + Std.string(nodeIndex) + ".json");
        };

        request.send();
    }
}
