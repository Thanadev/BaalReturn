package fr.thanadev.baalreturn.classes;

import fr.thanadev.baalreturn.classes.patterns.EnemyPattern;

class Enemy extends Damageable {

    @:isVar public var _pattern(get, null):EnemyPattern;
    @:isVar public var _imageUrl(get, null):String;

    public function new(name:String, health:Float, pattern:EnemyPattern, imageUrl:String) {
        super(name, health);
        _pattern = pattern;
        _imageUrl = imageUrl;
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

    function get__imageUrl():String {
        return _imageUrl;
    }
}
