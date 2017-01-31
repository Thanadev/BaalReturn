package fr.thanadev.baalreturn.services;

import msignal.Signal.Signal0;
import msignal.Signal.Signal1;
import fr.thanadev.baalreturn.classes.Enemy;
import fr.thanadev.baalreturn.classes.Player;

class FightBusinessService {
    private static var _instance:FightBusinessService;

    public var fightEndSignal:Signal1<Int>;

    private var _isFightActive:Bool;
    private var _player:Player;
    private var _enemy:Enemy;
    private var _playerTurn:Bool;
    private var _victoryNodeIndex:Int;

    public static function getInstance():FightBusinessService {
        if (_instance == null) {
            _instance = new FightBusinessService();
        }

        return _instance;
    }

    public function startFight(player:Player, enemy:Enemy, victoryNodeIndex:Int):Void {
        _player = player;
        _player.deathSignal.add(function() {
            damageableDeathHandler(true);
        });

        _enemy = enemy;
        _enemy.deathSignal.add(function() {
            damageableDeathHandler(false);
        });

        _isFightActive = true;
        _victoryNodeIndex = victoryNodeIndex;
    }

    public function playerPlayed() {
        if (_isFightActive) {
            _playerTurn = false;
            _enemy._pattern.execute();
            _playerTurn = true;
        }
    }

    public function isPlayerTurn() {
        return _playerTurn;
    }

    public function damageableDeathHandler(isPlayerDead:Bool) {
        initFightService();

        if (isPlayerDead) {
            fightEndSignal.dispatch(13);
        } else {
            fightEndSignal.dispatch(_victoryNodeIndex);
        }
    }

    private function initFightService() {
        _isFightActive = false;
        _playerTurn = true;
    }

    private function new() {
        fightEndSignal = new Signal1<Int>();
        initFightService();
    }
}
