package fr.thanadev.baalreturn.views;

import fr.thanadev.baalreturn.classes.Player;
import msignal.Signal.Signal1;
import js.JQuery;
import js.html.Element;
import org.tamina.html.component.HTMLComponent;

@view("")
class PlayerView extends HTMLComponent {
    @skinpart private var _playerName:Element;
    @skinpart private var _playerLife:Element;

    private var _model:Player;

    public function new() {
        super();
    }

    public function setModel(player:Player):Void {
        _model = player;
        _model.modelUpdatedSignal.add(modelChangedHandler);

        updateView();
    }

    override public function createdCallback():Void {
        super.createdCallback();

        _model = null;
    }

    public function modelChangedHandler():Void {
        updateView();
    }

    public function updateView():Void {
        _playerName.innerText = _model.name;
        _playerLife.innerText = Std.string(_model.health);
    }
}
