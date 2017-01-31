package fr.thanadev.baalreturn.views;

import fr.thanadev.baalreturn.classes.Enemy;
import msignal.Signal.Signal1;
import js.JQuery;
import js.html.Element;
import org.tamina.html.component.HTMLComponent;

@view("")
class EnemyView extends HTMLComponent {
    @skinpart private var _enemyName:Element;
    @skinpart private var _enemyLife:Element;

    private var _model:Enemy;

    public function new() {
        super();
    }

    public function setModel(enemy:Enemy):Void {
        _model = enemy;
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
        _enemyName.innerText = _model.name;
        _enemyLife.innerText = Std.string(_model.health);
    }
}
