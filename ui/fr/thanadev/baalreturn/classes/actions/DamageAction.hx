package fr.thanadev.baalreturn.classes.actions;

import fr.thanadev.baalreturn.services.EnemyService;
import fr.thanadev.baalreturn.services.PlayerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;

class DamageAction extends Action {
    @:isVar public var _damages(get, set):Float;

    public function new(target:String, damages:Float) {
        super(target);
        this._damages = damages;
    }

    public override function run() {
        if (_target == ActionTarget.PLAYER) {
            PlayerService.getPlayer().takeDamages(_damages);
        } else if (_target == ActionTarget.ENEMY) {
            EnemyService.getCurrentEnemy().takeDamages(_damages);
        }
    }

    function set__damages(value:Float) {
        return this._damages = value;
    }

    function get__damages():Float {
        return _damages;
    }
}
