package fr.thanadev.baalreturn.classes.actions;

import fr.thanadev.baalreturn.services.PlayerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;

class ClassChoiceAction extends Action {
    @:isVar public var _className(get, null):String;

    public function new(target:String, className:String) {
        super(target);
        this._className = className;
    }

    public override function run() {
        PlayerService.choosePlayerClass(_className);
    }

    function get__className():String {
        return _className;
    }

    function set__className(value:String) {
        return this._className = value;
    }
}
