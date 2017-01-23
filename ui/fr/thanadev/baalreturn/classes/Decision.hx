package fr.thanadev.baalreturn.classes;

import fr.thanadev.baalreturn.dao.NodeDao;
import haxe.Json;
import msignal.Signal.Signal1;
import Array;

class Decision {
    public var decisionChosen:Signal1<Int>;
    public var index:Int;

    @:isVar public var _text(get, null):String;
    @:isVar public var _actions(get, null):Array<Action>;
    @:isVar public var _targetNode(get, null):Node;
    @:isVar public var _targetNodeId(get, null):Int;

    public function new(text:String, targetNodeId) {
        _text = text;
        _actions = new Array<Action>();
        _targetNodeId = targetNodeId;
        decisionChosen = new Signal1<Int>();
    }

    public static function fromJson(json:String):Decision {
        var parsed = Json.parse(json);
        var decision = new Decision(parsed._text, parsed._targetNodeId);

        return decision;
    }

    public static function fromDynamic(parsed:Dynamic):Decision {
        trace("Decision : " + parsed);
        var decision = new Decision(parsed._text, parsed._targetNodeId);

        return decision;
    }

    public function run() {
        decisionChosen.dispatch(_targetNodeId);
    }

    function get__text():String {
        return _text;
    }

    function get__actions():Array<Action> {
        return _actions;
    }

    function get__targetNode():Node {
        return _targetNode;
    }

    function get__targetNodeId():Int {
        return _targetNodeId;
    }


}
