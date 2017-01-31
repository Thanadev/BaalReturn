package fr.thanadev.baalreturn.classes.patterns;

import fr.thanadev.baalreturn.services.LoggerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;
import fr.thanadev.baalreturn.classes.actions.DamageAction;

class BaseMinionPattern extends EnemyPattern {

    public function new() {
        super();
    }

    override public function execute() {
        var attack = new DamageAction(ActionTarget.PLAYER, 2);
        LoggerService.getInstance().log("Le sbire de Baal vous entaille, vous perdez 2 points de vie !");
        attack.run();
    }
}
