package fr.thanadev.baalreturn.services;

import msignal.Signal.Signal1;

class LoggerService {
    public var onLog:Signal1<String>;

    private static var _instance:LoggerService = null;

    private var logs:Array<String>;

    public static function getInstance():LoggerService {
        if (_instance == null) {
            _instance = new LoggerService();
        }

        return _instance;
    }

    public function log(message:String) {
        logs.push(message);
        onLog.dispatch(message);
    }

    public function clearArea() {
        onLog.dispatch("");
    }

    public function clearAll() {
        onLog.dispatch("");
        logs = new Array<String>();
    }

    private function new() {
        onLog = new Signal1<String>();
        logs = new Array<String>();
    }
}
