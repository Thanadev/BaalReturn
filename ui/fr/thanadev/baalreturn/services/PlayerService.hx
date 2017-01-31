package fr.thanadev.baalreturn.services;

import fr.thanadev.baalreturn.classes.PlayerClass;
import fr.thanadev.baalreturn.classes.Player;
class PlayerService {
    private static var _instance:PlayerService = null;

    @:isVar public var _player(get, null):Player;

    public static function getInstance(playerName:String = "hero", playerHealth:Float = 100):PlayerService {
        if (_instance == null) {
            _instance = new PlayerService(playerName, playerHealth);
        }

        return _instance;
    }

    public static function choosePlayerClass(className:String) {
        _instance._player._class = new PlayerClass(className);
    }

    public static function getPlayer():Player {
        return _instance._player;
    }

    private function new(playerName:String, playerHealth:Float) {
        _player = new Player(playerName, playerHealth);
    }

    function get__player():Player {
        return _player;
    }
}
