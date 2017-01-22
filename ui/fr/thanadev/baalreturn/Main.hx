package fr.thanadev.baalreturn;

import org.tamina.html.component.HTMLApplication;
import fr.thanadev.baalreturn.views.MainView;

class Main extends HTMLApplication {

    private static var _instance:Main;
    private var _mainView:MainView;

    public static function main():Void {
        _instance = new Main();
    }

    public function new() {
        super();
        trace("Instantiating the game...");
        _mainView = new MainView();
        loadComponents();
    }
}
