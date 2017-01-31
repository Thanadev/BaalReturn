package fr.thanadev.baalreturn.classes.patterns;

import fr.thanadev.baalreturn.services.LoggerService;
import fr.thanadev.baalreturn.classes.actions.Action.ActionTarget;
import fr.thanadev.baalreturn.classes.actions.DamageAction;

class BaalPattern extends EnemyPattern {

    public function new() {
        super();
    }

    override public function execute() {
        var attack = new DamageAction(ActionTarget.PLAYER, 10);
        LoggerService.getInstance().log("Cet être terrible vous prend pour un jouet. Il vous assène un petit coup qui vous fait perdre 10 points de vie !");
        attack.run();
    }
}
