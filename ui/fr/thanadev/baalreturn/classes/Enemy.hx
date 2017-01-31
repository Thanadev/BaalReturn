package fr.thanadev.baalreturn.classes;

import fr.thanadev.baalreturn.classes.patterns.EnemyPattern;

class Enemy extends Damageable {

    @:isVar public var _pattern(get, null):EnemyPattern;

    public function new(name:String, health:Float, pattern:EnemyPattern) {
        super(name, health);
        _pattern = pattern;
    }

    public function setName(name:String):Void {
        this.name = name;
        modelUpdatedSignal.dispatch();
    }

    public function setHealth(health:Float):Void {
        this.health = health;
        modelUpdatedSignal.dispatch();
    }

    function get__pattern():EnemyPattern {
        return _pattern;
    }
}
