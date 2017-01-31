package fr.thanadev.baalreturn.classes;

import fr.thanadev.baalreturn.services.PlayerService;
import fr.thanadev.baalreturn.services.FightBusinessService;
import fr.thanadev.baalreturn.services.EnemyService;
import fr.thanadev.baalreturn.classes.actions.Action;
import haxe.Json;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

class Node {
    public var index:Int;
    public var modelUpdatedSignal:Signal0;
    public var nextNodeChosen:Signal1<Int>;

    @:isVar public var _decisions(get, null):Array<Decision>;
    @:isVar public var _actions(get, null):Array<Action>;
    @:isVar public var _text(get, null):String;
    @:isVar public var _nextNodeIndex(get, null):Int;
    @:isVar public var _enemyId(get, null):Int;

    public function new(index:Int, text:String) {
        modelUpdatedSignal = new Signal0();
        nextNodeChosen = new Signal1<Int>();

        this.index = index;
        _text = text;
        _decisions = new Array<Decision>();
        _actions = new Array<Action>();
    }

    public static function fromJson(json:String):Node {
        var parsed:Dynamic = Json.parse(json);
        var node = new Node(parsed.index, parsed._text);

        for (i in 0...parsed._decisions.length) {
            var array = cast(parsed._decisions, Array<Dynamic>);
            var parsedDecision = Decision.fromDynamic(array[i]);

            node.addDecision(parsedDecision);
        }

        for (i in 0...parsed._actions.length) {
            var array = cast(parsed._actions, Array<Dynamic>);
            var parsedAction = Action.fromDynamic(array[i]);

            node.addAction(parsedAction);
        }

        node.initFightNode(parsed._enemyId, parsed._nextNodeIndex);

        return node;
    }

    public function run():Void {
        for (action in _actions) {
            action.run();
        }

        if (_enemyId != null && _nextNodeIndex != null) {
            EnemyService.getInstance().generateEnemyFromId(_enemyId);
            FightBusinessService.getInstance().startFight(PlayerService.getPlayer(), EnemyService.getCurrentEnemy(), _nextNodeIndex);
        }
    }

    public function initFightNode(enemyId:Int, nextNode:Int) {
        _enemyId = enemyId;
        _nextNodeIndex = nextNode;
    }

    public function addDecision(decision:Decision):Void {
        _decisions.push(decision);
        decision.index = _decisions.length - 1;
        decision.decisionChosen.add(decisionChosenHandler);
        modelUpdatedSignal.dispatch();
    }

    public function addAction(action:Action):Void {
        _actions.push(action);
        modelUpdatedSignal.dispatch();
    }

    public function decisionChosenHandler(targetNodeId:Int):Void {
        nextNodeChosen.dispatch(targetNodeId);
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

    function get__nextNodeIndex():Int {
        return _nextNodeIndex;
    }

    function get__enemyId():Int {
        return _enemyId;
    }
}
