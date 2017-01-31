package fr.thanadev.baalreturn.classes;

class Player extends Damageable {

    @:isVar public var _class(get, set):PlayerClass;

    public function new(name:String, health:Float) {
        super(name, health);
    }

    function set__class(value:PlayerClass) {
        return this._class = value;
    }

    function get__class():PlayerClass {
        return _class;
    }
}
