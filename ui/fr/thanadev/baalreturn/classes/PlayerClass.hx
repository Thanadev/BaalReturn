package fr.thanadev.baalreturn.classes;

class PlayerClass {
    public static inline var REAPER = "reaper";
    public static inline var ROGUE = "rogue";
    public static inline var PRIEST = "priest";
    public static inline var MAGUS = "magus";
    public static inline var WARRIOR = "warrior";
    public static inline var RANGER = "ranger";

    @:isVar public var _decision(get, null):Decision;

    public function new(type:String) {
        switch (type) {
            case REAPER:
                _decision = new Decision("Reaper attack", null, "");
                _decision.usableOnlyInBattle = true;
            case ROGUE:
                _decision = new Decision("Rogue attack", null, "");
                _decision.usableOnlyInBattle = true;
            case PRIEST:
                _decision = new Decision("Priest attack", null, "");
                _decision.usableOnlyInBattle = true;
            case RANGER:
                _decision = new Decision("Ranger attack", null, "");
                _decision.usableOnlyInBattle = true;
            case MAGUS:
                _decision = new Decision("Magus attack", null, "");
                _decision.usableOnlyInBattle = true;
            case WARRIOR:
                _decision = new Decision("Warrior attack", null, "");
                _decision.usableOnlyInBattle = true;
            default:
                trace("You fool !");
        }
    }

    function get__decision():Decision {
        return _decision;
    }
}