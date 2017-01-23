package fr.thanadev.baalreturn.views;

import fr.thanadev.baalreturn.dao.NodeDao;
import js.Browser;
import fr.thanadev.baalreturn.classes.Decision;
import fr.thanadev.baalreturn.classes.Node;
import haxe.Json;
import js.JQuery;
import org.tamina.html.component.HTMLComponent;

@view("")
class MainView extends HTMLComponent {

    @skinpart("") private var _nodeView:NodeView;

    private var _loader:NodeDao;
    private var _nodes:Array<Node>;
    private var _currentNode:Int;
    private var _nextNode:Int;

    public function new() {
        super();
    }

    override public function createdCallback():Void {
        super.createdCallback();
        _currentNode = -1;
        _loader = NodeDao.getInstance();

        initNodes();
    }

    public function nodeLoadedHandler(node:Node):Void {
        node.nextNodeChosen.add(loadNode);
        _nodes.push(node);
        _currentNode++;

        if (this._skinPartsAttached) {
            skinTimeoutHandler();
        } else {
            trace("Waiting for skinparts to be attached");
            Browser.window.setTimeout(skinTimeoutHandler, 1);
        }
    }

    private function initNodes() {
        _nodes = new Array<Node>();

        loadNode(0);
    }

    private function skinTimeoutHandler() {
        _nodeView.setModel(_nodes[_currentNode]);
    }

    private function loadNode(nodeIndex:Int = -1) {
        trace("NodeIndex asked : " + nodeIndex);
        _loader.loadNode(nodeIndex, nodeLoadedHandler);
    }
}
