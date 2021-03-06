package fr.thanadev.baalreturn.views;

import fr.thanadev.baalreturn.services.LoggerService;
import createjs.easeljs.EventDispatcher;
import msignal.Signal.Signal1;
import org.tamina.events.html.MouseEventType;
import js.html.Event;
import fr.thanadev.baalreturn.classes.Node;
import js.JQuery;
import js.html.Element;
import org.tamina.html.component.HTMLComponent;

@view("")
class NodeView extends HTMLComponent {

    public var requestNode:Signal1<Int>;

    @skinpart private var _nodeName:Element;
    @skinpart private var _nodeText:Element;
    @skinpart private var _nodeLog:Element;
    @skinpart private var _nodeContainer:Element;
    @skinpart private var _decisionContainer:Element;

    private var _currentButtons:Array<JQuery>;
    private var _model:Node;

    public function new() {
        super();
    }

    public function setModel(node:Node):Void {
        _model = node;
        _model.modelUpdatedSignal.add(modelChangedHandler);
        node.run();

        updateView();
    }

    override public function createdCallback():Void {
        super.createdCallback();

        LoggerService.getInstance().onLog.add(displayLog);

        _model = null;
        _currentButtons = new Array<JQuery>();
        requestNode = new Signal1<Int>();
    }

    public function modelChangedHandler():Void {
        updateView();
    }

    public function decisionClickedHandler(event:js.JQuery.JqEvent):Void {
        event.preventDefault();
        var button = untyped __js__("event.target");
        var id:String = button.id;
        var jQButton = new JQuery(event.target);

        id = id.split('_')[1];
        _model._decisions[Std.parseInt(id)].run();
    }

    public function updateView():Void {
        // Node Text
        var titleCont = new JQuery("#nodeName");
        titleCont.text(_model._title);

        // Node Text
        var textCont = new JQuery("#nodeText");
        textCont.text(_model._text);

        // Decision Container
        var cont = new JQuery("#decisionContainer");
        cont.text("");

        _currentButtons = new Array<JQuery>();
        for (decision in _model._decisions) {
            var button = cont.append("<button id='decision_" + decision.index + "'>" + decision._text + "</button>");
            button.unbind();
            button.on("click", decisionClickedHandler);
            _currentButtons.push(button);
        }
    }

    public function displayLog(message:String) {
        var logArea = new JQuery(_nodeLog);
        logArea.text(message);
    }
}
