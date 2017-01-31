package fr.thanadev.baalreturn.classes.patterns;

import fr.thanadev.baalreturn.services.LoggerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;
import fr.thanadev.baalreturn.classes.actions.DamageAction;

class FairySoldierPattern extends EnemyPattern {

    public function new() {
        super();
    }

    override public function execute() {
        var attack = new DamageAction(ActionTarget.PLAYER, 5);
        LoggerService.getInstance().log("La fée vous attaque avec son couteau. Vous perdez 5 points de vie.");
        attack.run();
    }
}
