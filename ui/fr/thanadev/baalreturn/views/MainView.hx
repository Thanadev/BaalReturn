package fr.thanadev.baalreturn.views;

import js.Browser;
import fr.thanadev.baalreturn.classes.Decision;
import fr.thanadev.baalreturn.classes.Node;
import haxe.Json;
import js.JQuery;
import org.tamina.html.component.HTMLComponent;

@view("")
class MainView extends HTMLComponent {

    @skinpart("") private var _nodeView:NodeView;

    private var _nodes:Array<Node>;
    private var _currentNode:Int;
    private var _nextNode:Int;

    public function new() {
        super();
    }

    override public function createdCallback():Void {
        super.createdCallback();
        _currentNode = 0;

        initNodes();

        if (this._skinPartsAttached) {
            skinTimeoutHandler();
        } else {
            trace("Waiting for skinparts to be attached");
            Browser.window.setTimeout(skinTimeoutHandler, 1);
        }
    }

    private function initNodes() {
        _nodes = new Array<Node>();
        _nodes.push(new Node(0, "Node 1"));
        _nodes.push(new Node(1, "Node 2"));
        var decision = new Decision("Choice 1", _nodes[1]);
        decision.decisionChosen.add(loadNode);
        _nodes[0].addDecision(decision);
    }

    private function skinTimeoutHandler() {
        _nodeView.setModel(_nodes[_currentNode]);
    }

    private function changeNode(targetNode:Node):Void {

    }

    private function loadNode(node:Node) {
        trace("nodeIndex asked" + node.index);
        if (node.index > 0 && node.index < _nodes.length) {
            _nodeView.setModel(_nodes[node.index]);
        }
    }
}
