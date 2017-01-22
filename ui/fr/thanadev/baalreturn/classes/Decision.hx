package fr.thanadev.baalreturn.classes;

import msignal.Signal.Signal1;
import Array;

class Decision {
    public var decisionChosen:Signal1<Node>;
    public var index:Int;

    @:isVar public var _text(get, null):String;
    @:isVar public var _actions(get, null):Array<Action>;
    private var _targetNode:Node;

    public function new(text:String, targetNode:Node) {
        _text = text;
        _actions = new Array<Action>();
        _targetNode = targetNode;
        decisionChosen = new Signal1<Node>();
    }

    public function run() {
        decisionChosen.dispatch(_targetNode);
    }

    function get__text():String {
        return _text;
    }

    function get__actions():Array<Action> {
        return _actions;
    }
}
