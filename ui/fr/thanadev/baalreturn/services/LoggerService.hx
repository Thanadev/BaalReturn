package fr.thanadev.baalreturn.services;

import msignal.Signal.Signal1;

class LoggerService {
    public var onLog:Signal1<String>;

    private static var _instance:LoggerService = null;

    public static function getInstance():LoggerService {
        if (_instance == null) {
            _instance = new LoggerService();
        }

        return _instance;
    }

    private function new() {
        onLog = new Signal1<String>();
    }
}
