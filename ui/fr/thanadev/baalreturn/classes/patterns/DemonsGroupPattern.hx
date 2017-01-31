package fr.thanadev.baalreturn.classes.patterns;

import fr.thanadev.baalreturn.services.LoggerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;
import fr.thanadev.baalreturn.classes.actions.DamageAction;

class DemonsGroupPattern extends EnemyPattern {

    public function new() {
        super();
    }

    override public function execute() {
        var attack = new DamageAction(ActionTarget.PLAYER, 3);
        LoggerService.getInstance().log("Le groupe lance une attaque synchronisée, mais Leef vous protège en partie. Vous perdez 3 points de vie");
        attack.run();
    }
}
