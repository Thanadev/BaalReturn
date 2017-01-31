package fr.thanadev.baalreturn.classes;

import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

class Damageable {
    public var deathSignal:Signal0;
    public var modelUpdatedSignal:Signal0;

    @:isVar public var name(get, null):String;
    @:isVar public var health(get, null):Float;

    public function new(name:String, health:Float) {
        deathSignal = new Signal0();
        modelUpdatedSignal = new Signal0();

        this.name = name;
        this.health = health;
    }

    public function takeDamages(damages:Float):Void {
        health -= damages;

        if (health <= 0) {
            health = 0;
            die();
        }

        modelUpdatedSignal.dispatch();
    }

    private function die():Void {
        deathSignal.dispatch();
    }

    function get_health():Float {
        return health;
    }

    function get_name():String {
        return name;
    }
}
