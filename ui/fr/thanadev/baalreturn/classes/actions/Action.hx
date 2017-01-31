package fr.thanadev.baalreturn.classes.actions;

import msignal.Signal.Signal0;

class Action {
    public var requestCurrentPlayer:Signal0;
    public var requestCurrentEnemy:Signal0;

    @:isVar public var _target(get, set):String;

    public function new(target:String) {
        requestCurrentPlayer = new Signal0();
        requestCurrentEnemy = new Signal0();

        _target = target;
    }

    @abstract public function run():Void {}

    public static function fromDynamic(parsed:Dynamic):Action {
        var action:Action;

        if (Reflect.hasField(parsed, "_damages")) {
            action = new DamageAction(parsed._target, parsed._damages);
        } else if (Reflect.hasField(parsed, "_className")) {
            action = new ClassChoiceAction(parsed._target, parsed._className);
        } else {
            action = new Action(parsed._target);
        }

        return action;
    }

    function set__target(value:String) {
        return this._target = value;
    }

    function get__target():String {
        return _target;
    }
}

class ActionTarget {
    public static inline var PLAYER = "player";
    public static inline var ENEMY = "enemy";
}