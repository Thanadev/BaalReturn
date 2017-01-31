package fr.thanadev.baalreturn.services;

import fr.thanadev.baalreturn.classes.patterns.EnemyPattern;
import fr.thanadev.baalreturn.classes.patterns.BaseMinionPattern;
import msignal.Signal.Signal1;
import fr.thanadev.baalreturn.classes.Enemy;

class EnemyService {
    private static var _instance:EnemyService = null;
    private static var _defaultPattern:EnemyPattern;

    public var enemyLoaded:Signal1<Enemy>;

    @:isVar public var _enemy(get, null):Enemy = null;

    public static function getInstance(enemyName:String = "Soldat de la corruption", enemyHealth:Float = 100, enemyPattern:EnemyPattern = null):EnemyService {
        if (_instance == null) {
            _defaultPattern = new BaseMinionPattern();

            if (enemyPattern == null) {
                enemyPattern = _defaultPattern;
            }
            _instance = new EnemyService(enemyName, enemyHealth, enemyPattern);
            _instance.enemyLoaded.dispatch(_instance._enemy);
        }

        return _instance;
    }

    public static function getCurrentEnemy():Enemy {
        return _instance._enemy;
    }

    public function generateEnemyFromId(enemyId:Int) {
        switch (enemyId) {
            case 1:
                _enemy = new Enemy("Soldat de la corruption", 100, new BaseMinionPattern(), "img/enemies/baalMinion.jpg");
        }

        enemyLoaded.dispatch(_enemy);
    }

    private function new(enemyName:String, enemyHealth:Float, pattern:EnemyPattern) {
        _enemy = new Enemy(enemyName, enemyHealth, pattern, "img/enemies/baalMinion.jpg");
        enemyLoaded = new Signal1<Enemy>();
    }

    function get__enemy():Enemy {
        return _enemy;
    }
}
