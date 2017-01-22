package fr.thanadev.baalreturn.classes;

import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

class Node {
    public var index:Int;
    public var modelUpdatedSignal:Signal0;
    public var nextNodeChosen:Signal1<Node>;

    @:isVar public var _decisions(get, null):Array<Decision>;
    @:isVar public var _actions(get, null):Array<Action>;
    @:isVar public var _text(get, null):String;

    public function new(index:Int, text:String) {
        modelUpdatedSignal = new Signal0();
        nextNodeChosen = new Signal1<Node>();

        this.index = index;
        _text = text;
        _decisions = new Array<Decision>();
        _actions = new Array<Action>();
    }

    public function addDecision(decision:Decision):Void {
        _decisions.push(decision);
        decision.index = _decisions.length - 1;
        decision.decisionChosen.add(decisionChosenHandler);
        modelUpdatedSignal.dispatch();
    }

    public function decisionChosenHandler(targetNode:Node):Void {
        nextNodeChosen.dispatch(targetNode);
    }

    function get__decisions():Array<Decision> {
        return _decisions;
    }

    function get__actions():Array<Action> {
        return _actions;
    }

    function get__text():String {
        return _text;
    }
}
