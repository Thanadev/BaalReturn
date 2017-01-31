(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
var org_tamina_html_component_HTMLApplication = function() {
};
$hxClasses["org.tamina.html.component.HTMLApplication"] = org_tamina_html_component_HTMLApplication;
org_tamina_html_component_HTMLApplication.__name__ = ["org","tamina","html","component","HTMLApplication"];
org_tamina_html_component_HTMLApplication.get_componentsXTagList = function() {
	if(org_tamina_html_component_HTMLApplication.componentsXTagList == null) org_tamina_html_component_HTMLApplication.componentsXTagList = new haxe_ds_StringMap();
	return org_tamina_html_component_HTMLApplication.componentsXTagList;
};
org_tamina_html_component_HTMLApplication.createInstance = function(type) {
	var className = Type.getClassName(type);
	var tag = org_tamina_html_component_HTMLApplication.getTagByClassName(className);
	return window.document.createElement(tag);
};
org_tamina_html_component_HTMLApplication.isCustomElement = function(nodeName) {
	var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
	var key = nodeName.toLowerCase();
	return this1.exists(key);
};
org_tamina_html_component_HTMLApplication.getTagByClassName = function(className) {
	var result = "";
	var $it0 = (function($this) {
		var $r;
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		$r = this1.keys();
		return $r;
	}(this));
	while( $it0.hasNext() ) {
		var tag = $it0.next();
		var value;
		var this2 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		value = this2.get(tag);
		if(value == className) {
			result = tag;
			break;
		}
	}
	return result;
};
org_tamina_html_component_HTMLApplication.prototype = {
	loadComponents: function() {
		var $it0 = (function($this) {
			var $r;
			var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
			$r = this1.keys();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var tag = $it0.next();
			var componentClass = Type.resolveClass((function($this) {
				var $r;
				var this2 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
				$r = this2.get(tag);
				return $r;
			}(this)));
			window.document.registerElement(tag,componentClass);
		}
	}
	,__class__: org_tamina_html_component_HTMLApplication
};
var fr_thanadev_baalreturn_Main = function() {
	org_tamina_html_component_HTMLApplication.call(this);
	console.log("Instantiating the game...");
	this._mainView = new fr_thanadev_baalreturn_views_MainView();
	this.loadComponents();
};
$hxClasses["fr.thanadev.baalreturn.Main"] = fr_thanadev_baalreturn_Main;
fr_thanadev_baalreturn_Main.__name__ = ["fr","thanadev","baalreturn","Main"];
fr_thanadev_baalreturn_Main.main = function() {
	fr_thanadev_baalreturn_Main._instance = new fr_thanadev_baalreturn_Main();
};
fr_thanadev_baalreturn_Main.__super__ = org_tamina_html_component_HTMLApplication;
fr_thanadev_baalreturn_Main.prototype = $extend(org_tamina_html_component_HTMLApplication.prototype,{
	__class__: fr_thanadev_baalreturn_Main
});
var fr_thanadev_baalreturn_classes_Damageable = function(name,health) {
	this.deathSignal = new msignal_Signal0();
	this.modelUpdatedSignal = new msignal_Signal0();
	this.name = name;
	this.health = health;
};
$hxClasses["fr.thanadev.baalreturn.classes.Damageable"] = fr_thanadev_baalreturn_classes_Damageable;
fr_thanadev_baalreturn_classes_Damageable.__name__ = ["fr","thanadev","baalreturn","classes","Damageable"];
fr_thanadev_baalreturn_classes_Damageable.prototype = {
	takeDamages: function(damages) {
		this.health -= damages;
		if(this.get_health() <= 0) {
			this.health = 0;
			this.die();
		}
		this.modelUpdatedSignal.dispatch();
	}
	,die: function() {
		this.deathSignal.dispatch();
	}
	,get_health: function() {
		return this.health;
	}
	,get_name: function() {
		return this.name;
	}
	,__class__: fr_thanadev_baalreturn_classes_Damageable
};
var fr_thanadev_baalreturn_classes_Decision = function(text,targetNodeId,message) {
	this._text = text;
	this._actions = [];
	this._targetNodeId = targetNodeId;
	this._message = message;
	this.decisionChosen = new msignal_Signal1();
};
$hxClasses["fr.thanadev.baalreturn.classes.Decision"] = fr_thanadev_baalreturn_classes_Decision;
fr_thanadev_baalreturn_classes_Decision.__name__ = ["fr","thanadev","baalreturn","classes","Decision"];
fr_thanadev_baalreturn_classes_Decision.fromDynamic = function(parsed) {
	var decision = new fr_thanadev_baalreturn_classes_Decision(parsed._text,parsed._targetNodeId,parsed._message);
	var _g1 = 0;
	var _g = parsed._actions.length;
	while(_g1 < _g) {
		var i = _g1++;
		decision.addAction(fr_thanadev_baalreturn_classes_actions_Action.fromDynamic(parsed._actions[i]));
	}
	return decision;
};
fr_thanadev_baalreturn_classes_Decision.prototype = {
	run: function() {
		if(fr_thanadev_baalreturn_services_FightBusinessService.getInstance().isPlayerTurn()) {
			var _g = 0;
			var _g1 = this.get__actions();
			while(_g < _g1.length) {
				var action = _g1[_g];
				++_g;
				action.run();
			}
			fr_thanadev_baalreturn_services_LoggerService.getInstance().log(this.get__message());
			if(this.get__targetNodeId() != null && this.get__targetNodeId() > 0) this.decisionChosen.dispatch(this.get__targetNodeId()); else fr_thanadev_baalreturn_services_FightBusinessService.getInstance().playerPlayed();
		}
	}
	,addAction: function(action) {
		this.get__actions().push(action);
	}
	,get__text: function() {
		return this._text;
	}
	,get__actions: function() {
		return this._actions;
	}
	,get__targetNode: function() {
		return this._targetNode;
	}
	,get__targetNodeId: function() {
		return this._targetNodeId;
	}
	,get__message: function() {
		return this._message;
	}
	,__class__: fr_thanadev_baalreturn_classes_Decision
};
var fr_thanadev_baalreturn_classes_Enemy = function(name,health,pattern) {
	fr_thanadev_baalreturn_classes_Damageable.call(this,name,health);
	this._pattern = pattern;
};
$hxClasses["fr.thanadev.baalreturn.classes.Enemy"] = fr_thanadev_baalreturn_classes_Enemy;
fr_thanadev_baalreturn_classes_Enemy.__name__ = ["fr","thanadev","baalreturn","classes","Enemy"];
fr_thanadev_baalreturn_classes_Enemy.__super__ = fr_thanadev_baalreturn_classes_Damageable;
fr_thanadev_baalreturn_classes_Enemy.prototype = $extend(fr_thanadev_baalreturn_classes_Damageable.prototype,{
	setName: function(name) {
		this.name = name;
		this.modelUpdatedSignal.dispatch();
	}
	,setHealth: function(health) {
		this.health = health;
		this.modelUpdatedSignal.dispatch();
	}
	,get__pattern: function() {
		return this._pattern;
	}
	,__class__: fr_thanadev_baalreturn_classes_Enemy
});
var fr_thanadev_baalreturn_classes_Node = function(index,text) {
	this.modelUpdatedSignal = new msignal_Signal0();
	this.nextNodeChosen = new msignal_Signal1();
	this.index = index;
	this._text = text;
	this._decisions = [];
	this._actions = [];
};
$hxClasses["fr.thanadev.baalreturn.classes.Node"] = fr_thanadev_baalreturn_classes_Node;
fr_thanadev_baalreturn_classes_Node.__name__ = ["fr","thanadev","baalreturn","classes","Node"];
fr_thanadev_baalreturn_classes_Node.fromJson = function(json) {
	var parsed = JSON.parse(json);
	var node = new fr_thanadev_baalreturn_classes_Node(parsed.index,parsed._text);
	var _g1 = 0;
	var _g = parsed._decisions.length;
	while(_g1 < _g) {
		var i = _g1++;
		var array;
		array = js_Boot.__cast(parsed._decisions , Array);
		var parsedDecision = fr_thanadev_baalreturn_classes_Decision.fromDynamic(array[i]);
		node.addDecision(parsedDecision);
	}
	var _g11 = 0;
	var _g2 = parsed._actions.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var array1;
		array1 = js_Boot.__cast(parsed._actions , Array);
		var parsedAction = fr_thanadev_baalreturn_classes_actions_Action.fromDynamic(array1[i1]);
		node.addAction(parsedAction);
	}
	node.initFightNode(parsed._enemyId,parsed._nextNodeIndex);
	return node;
};
fr_thanadev_baalreturn_classes_Node.prototype = {
	run: function() {
		var _g = 0;
		var _g1 = this.get__actions();
		while(_g < _g1.length) {
			var action = _g1[_g];
			++_g;
			action.run();
		}
		if(this.get__enemyId() != null && this.get__nextNodeIndex() != null) {
			fr_thanadev_baalreturn_services_EnemyService.getInstance().generateEnemyFromId(this.get__enemyId());
			fr_thanadev_baalreturn_services_FightBusinessService.getInstance().startFight(fr_thanadev_baalreturn_services_PlayerService.getPlayer(),fr_thanadev_baalreturn_services_EnemyService.getCurrentEnemy(),this.get__nextNodeIndex());
		}
	}
	,initFightNode: function(enemyId,nextNode) {
		this._enemyId = enemyId;
		this._nextNodeIndex = nextNode;
	}
	,addDecision: function(decision) {
		this.get__decisions().push(decision);
		decision.index = this.get__decisions().length - 1;
		decision.decisionChosen.add($bind(this,this.decisionChosenHandler));
		this.modelUpdatedSignal.dispatch();
	}
	,addAction: function(action) {
		this.get__actions().push(action);
		this.modelUpdatedSignal.dispatch();
	}
	,decisionChosenHandler: function(targetNodeId) {
		this.nextNodeChosen.dispatch(targetNodeId);
	}
	,get__decisions: function() {
		return this._decisions;
	}
	,get__actions: function() {
		return this._actions;
	}
	,get__text: function() {
		return this._text;
	}
	,get__nextNodeIndex: function() {
		return this._nextNodeIndex;
	}
	,get__enemyId: function() {
		return this._enemyId;
	}
	,__class__: fr_thanadev_baalreturn_classes_Node
};
var fr_thanadev_baalreturn_classes_Player = function(name,health) {
	fr_thanadev_baalreturn_classes_Damageable.call(this,name,health);
};
$hxClasses["fr.thanadev.baalreturn.classes.Player"] = fr_thanadev_baalreturn_classes_Player;
fr_thanadev_baalreturn_classes_Player.__name__ = ["fr","thanadev","baalreturn","classes","Player"];
fr_thanadev_baalreturn_classes_Player.__super__ = fr_thanadev_baalreturn_classes_Damageable;
fr_thanadev_baalreturn_classes_Player.prototype = $extend(fr_thanadev_baalreturn_classes_Damageable.prototype,{
	__class__: fr_thanadev_baalreturn_classes_Player
});
var fr_thanadev_baalreturn_classes_actions_Action = function(target) {
	this.requestCurrentPlayer = new msignal_Signal0();
	this.requestCurrentEnemy = new msignal_Signal0();
	this.set__target(target);
};
$hxClasses["fr.thanadev.baalreturn.classes.actions.Action"] = fr_thanadev_baalreturn_classes_actions_Action;
fr_thanadev_baalreturn_classes_actions_Action.__name__ = ["fr","thanadev","baalreturn","classes","actions","Action"];
fr_thanadev_baalreturn_classes_actions_Action.fromDynamic = function(parsed) {
	var action;
	if(Object.prototype.hasOwnProperty.call(parsed,"_damages")) action = new fr_thanadev_baalreturn_classes_actions_DamageAction(parsed._target,parsed._damages); else action = new fr_thanadev_baalreturn_classes_actions_Action(parsed._target);
	return action;
};
fr_thanadev_baalreturn_classes_actions_Action.prototype = {
	run: function() {
	}
	,set__target: function(value) {
		return this._target = value;
	}
	,get__target: function() {
		return this._target;
	}
	,__class__: fr_thanadev_baalreturn_classes_actions_Action
};
var fr_thanadev_baalreturn_classes_actions_ActionTarget = function() { };
$hxClasses["fr.thanadev.baalreturn.classes.actions.ActionTarget"] = fr_thanadev_baalreturn_classes_actions_ActionTarget;
fr_thanadev_baalreturn_classes_actions_ActionTarget.__name__ = ["fr","thanadev","baalreturn","classes","actions","ActionTarget"];
var fr_thanadev_baalreturn_classes_actions_DamageAction = function(target,damages) {
	fr_thanadev_baalreturn_classes_actions_Action.call(this,target);
	this.set__damages(damages);
};
$hxClasses["fr.thanadev.baalreturn.classes.actions.DamageAction"] = fr_thanadev_baalreturn_classes_actions_DamageAction;
fr_thanadev_baalreturn_classes_actions_DamageAction.__name__ = ["fr","thanadev","baalreturn","classes","actions","DamageAction"];
fr_thanadev_baalreturn_classes_actions_DamageAction.__super__ = fr_thanadev_baalreturn_classes_actions_Action;
fr_thanadev_baalreturn_classes_actions_DamageAction.prototype = $extend(fr_thanadev_baalreturn_classes_actions_Action.prototype,{
	run: function() {
		if(this.get__target() == "player") fr_thanadev_baalreturn_services_PlayerService.getPlayer().takeDamages(this.get__damages()); else if(this.get__target() == "enemy") fr_thanadev_baalreturn_services_EnemyService.getCurrentEnemy().takeDamages(this.get__damages());
	}
	,set__damages: function(value) {
		return this._damages = value;
	}
	,get__damages: function() {
		return this._damages;
	}
	,__class__: fr_thanadev_baalreturn_classes_actions_DamageAction
});
var fr_thanadev_baalreturn_classes_patterns_EnemyPattern = function() {
};
$hxClasses["fr.thanadev.baalreturn.classes.patterns.EnemyPattern"] = fr_thanadev_baalreturn_classes_patterns_EnemyPattern;
fr_thanadev_baalreturn_classes_patterns_EnemyPattern.__name__ = ["fr","thanadev","baalreturn","classes","patterns","EnemyPattern"];
fr_thanadev_baalreturn_classes_patterns_EnemyPattern.prototype = {
	execute: function() {
	}
	,__class__: fr_thanadev_baalreturn_classes_patterns_EnemyPattern
};
var fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern = function() {
	fr_thanadev_baalreturn_classes_patterns_EnemyPattern.call(this);
};
$hxClasses["fr.thanadev.baalreturn.classes.patterns.BaseMinionPattern"] = fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern;
fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern.__name__ = ["fr","thanadev","baalreturn","classes","patterns","BaseMinionPattern"];
fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern.__super__ = fr_thanadev_baalreturn_classes_patterns_EnemyPattern;
fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern.prototype = $extend(fr_thanadev_baalreturn_classes_patterns_EnemyPattern.prototype,{
	execute: function() {
		var attack = new fr_thanadev_baalreturn_classes_actions_DamageAction("player",2);
		fr_thanadev_baalreturn_services_LoggerService.getInstance().log("Le sbire de Baal vous entaille, vous perdez 2 points de vie !");
		attack.run();
	}
	,__class__: fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern
});
var fr_thanadev_baalreturn_dao_NodeDao = function() {
};
$hxClasses["fr.thanadev.baalreturn.dao.NodeDao"] = fr_thanadev_baalreturn_dao_NodeDao;
fr_thanadev_baalreturn_dao_NodeDao.__name__ = ["fr","thanadev","baalreturn","dao","NodeDao"];
fr_thanadev_baalreturn_dao_NodeDao.getInstance = function() {
	if(fr_thanadev_baalreturn_dao_NodeDao._instance == null) fr_thanadev_baalreturn_dao_NodeDao._instance = new fr_thanadev_baalreturn_dao_NodeDao();
	return fr_thanadev_baalreturn_dao_NodeDao._instance;
};
fr_thanadev_baalreturn_dao_NodeDao.prototype = {
	loadNode: function(nodeIndex,callback) {
		var node;
		var request = new XMLHttpRequest();
		request.open("GET","assets/node_" + (nodeIndex == null?"null":"" + nodeIndex) + ".json",true);
		request.onload = function(e) {
			node = fr_thanadev_baalreturn_classes_Node.fromJson(StringTools.trim(request.response));
			callback(node);
		};
		request.onerror = function(e1) {
			console.log("Error : Could not find json file : nose_" + (nodeIndex == null?"null":"" + nodeIndex) + ".json");
		};
		request.send();
	}
	,__class__: fr_thanadev_baalreturn_dao_NodeDao
};
var fr_thanadev_baalreturn_services_EnemyService = function(enemyName,enemyHealth,pattern) {
	this._enemy = null;
	this._enemy = new fr_thanadev_baalreturn_classes_Enemy(enemyName,enemyHealth,pattern);
	this.enemyLoaded = new msignal_Signal1();
};
$hxClasses["fr.thanadev.baalreturn.services.EnemyService"] = fr_thanadev_baalreturn_services_EnemyService;
fr_thanadev_baalreturn_services_EnemyService.__name__ = ["fr","thanadev","baalreturn","services","EnemyService"];
fr_thanadev_baalreturn_services_EnemyService.getInstance = function(enemyName,enemyHealth,enemyPattern) {
	if(enemyHealth == null) enemyHealth = 100;
	if(enemyName == null) enemyName = "Soldat de la corruption";
	if(fr_thanadev_baalreturn_services_EnemyService._instance == null) {
		fr_thanadev_baalreturn_services_EnemyService._defaultPattern = new fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern();
		if(enemyPattern == null) enemyPattern = fr_thanadev_baalreturn_services_EnemyService._defaultPattern;
		fr_thanadev_baalreturn_services_EnemyService._instance = new fr_thanadev_baalreturn_services_EnemyService(enemyName,enemyHealth,enemyPattern);
		fr_thanadev_baalreturn_services_EnemyService._instance.enemyLoaded.dispatch(fr_thanadev_baalreturn_services_EnemyService._instance.get__enemy());
	}
	return fr_thanadev_baalreturn_services_EnemyService._instance;
};
fr_thanadev_baalreturn_services_EnemyService.getCurrentEnemy = function() {
	return fr_thanadev_baalreturn_services_EnemyService._instance.get__enemy();
};
fr_thanadev_baalreturn_services_EnemyService.prototype = {
	generateEnemyFromId: function(enemyId) {
		switch(enemyId) {
		case 1:
			this._enemy = new fr_thanadev_baalreturn_classes_Enemy("Soldat de la corruption",100,new fr_thanadev_baalreturn_classes_patterns_BaseMinionPattern());
			break;
		}
		this.enemyLoaded.dispatch(this.get__enemy());
	}
	,get__enemy: function() {
		return this._enemy;
	}
	,__class__: fr_thanadev_baalreturn_services_EnemyService
};
var fr_thanadev_baalreturn_services_FightBusinessService = function() {
	this.fightEndSignal = new msignal_Signal1();
	this.initFightService();
};
$hxClasses["fr.thanadev.baalreturn.services.FightBusinessService"] = fr_thanadev_baalreturn_services_FightBusinessService;
fr_thanadev_baalreturn_services_FightBusinessService.__name__ = ["fr","thanadev","baalreturn","services","FightBusinessService"];
fr_thanadev_baalreturn_services_FightBusinessService.getInstance = function() {
	if(fr_thanadev_baalreturn_services_FightBusinessService._instance == null) fr_thanadev_baalreturn_services_FightBusinessService._instance = new fr_thanadev_baalreturn_services_FightBusinessService();
	return fr_thanadev_baalreturn_services_FightBusinessService._instance;
};
fr_thanadev_baalreturn_services_FightBusinessService.prototype = {
	startFight: function(player,enemy,victoryNodeIndex) {
		var _g = this;
		this._player = player;
		this._player.deathSignal.add(function() {
			_g.damageableDeathHandler(true);
		});
		this._enemy = enemy;
		this._enemy.deathSignal.add(function() {
			_g.damageableDeathHandler(false);
		});
		this._isFightActive = true;
		this._victoryNodeIndex = victoryNodeIndex;
	}
	,playerPlayed: function() {
		if(this._isFightActive) {
			this._playerTurn = false;
			this._enemy.get__pattern().execute();
			this._playerTurn = true;
		}
	}
	,isPlayerTurn: function() {
		return this._playerTurn;
	}
	,damageableDeathHandler: function(isPlayerDead) {
		this.initFightService();
		if(isPlayerDead) this.fightEndSignal.dispatch(13); else this.fightEndSignal.dispatch(this._victoryNodeIndex);
	}
	,initFightService: function() {
		this._isFightActive = false;
		this._playerTurn = true;
	}
	,__class__: fr_thanadev_baalreturn_services_FightBusinessService
};
var fr_thanadev_baalreturn_services_LoggerService = function() {
	this.onLog = new msignal_Signal1();
	this.logs = [];
};
$hxClasses["fr.thanadev.baalreturn.services.LoggerService"] = fr_thanadev_baalreturn_services_LoggerService;
fr_thanadev_baalreturn_services_LoggerService.__name__ = ["fr","thanadev","baalreturn","services","LoggerService"];
fr_thanadev_baalreturn_services_LoggerService.getInstance = function() {
	if(fr_thanadev_baalreturn_services_LoggerService._instance == null) fr_thanadev_baalreturn_services_LoggerService._instance = new fr_thanadev_baalreturn_services_LoggerService();
	return fr_thanadev_baalreturn_services_LoggerService._instance;
};
fr_thanadev_baalreturn_services_LoggerService.prototype = {
	log: function(message) {
		this.logs.push(message);
		this.onLog.dispatch(message);
	}
	,clearArea: function() {
		this.onLog.dispatch("");
	}
	,clearAll: function() {
		this.onLog.dispatch("");
		this.logs = [];
	}
	,__class__: fr_thanadev_baalreturn_services_LoggerService
};
var fr_thanadev_baalreturn_services_PlayerService = function(playerName,playerHealth) {
	this._player = new fr_thanadev_baalreturn_classes_Player(playerName,playerHealth);
};
$hxClasses["fr.thanadev.baalreturn.services.PlayerService"] = fr_thanadev_baalreturn_services_PlayerService;
fr_thanadev_baalreturn_services_PlayerService.__name__ = ["fr","thanadev","baalreturn","services","PlayerService"];
fr_thanadev_baalreturn_services_PlayerService.getInstance = function(playerName,playerHealth) {
	if(playerHealth == null) playerHealth = 100;
	if(playerName == null) playerName = "hero";
	if(fr_thanadev_baalreturn_services_PlayerService._instance == null) fr_thanadev_baalreturn_services_PlayerService._instance = new fr_thanadev_baalreturn_services_PlayerService(playerName,playerHealth);
	return fr_thanadev_baalreturn_services_PlayerService._instance;
};
fr_thanadev_baalreturn_services_PlayerService.getPlayer = function() {
	return fr_thanadev_baalreturn_services_PlayerService._instance.get__player();
};
fr_thanadev_baalreturn_services_PlayerService.prototype = {
	get__player: function() {
		return this._player;
	}
	,__class__: fr_thanadev_baalreturn_services_PlayerService
};
var org_tamina_html_component_HTMLComponent = function() {
	this._skinPartsAttached = false;
};
$hxClasses["org.tamina.html.component.HTMLComponent"] = org_tamina_html_component_HTMLComponent;
org_tamina_html_component_HTMLComponent.__name__ = ["org","tamina","html","component","HTMLComponent"];
org_tamina_html_component_HTMLComponent.__super__ = HTMLHtmlElement;
org_tamina_html_component_HTMLComponent.prototype = $extend(HTMLHtmlElement.prototype,{
	createdCallback: function() {
		this.initDefaultValues();
		this.parseContent();
		this.initContent();
		this.displayContent();
		this.updateSkinPartsStatus();
		this.created = true;
		if(this._skinPartsAttached) this.creationCompleteCallback();
	}
	,creationCompleteCallback: function() {
		this.creationComplete = true;
		this.dispatchEvent(org_tamina_html_component_HTMLComponentEventFactory.createEvent("creationComplete"));
	}
	,attachedCallback: function() {
		if(!this.initialized) this.dispatchEvent(org_tamina_html_component_HTMLComponentEventFactory.createEvent("initialize"));
		this.initialized = true;
	}
	,detachedCallback: function() {
	}
	,attributeChangedCallback: function(attrName,oldVal,newVal) {
	}
	,initDefaultValues: function() {
		this._visible = true;
		this._useExternalContent = false;
		this._defaultDisplayStyle = "";
	}
	,get_visible: function() {
		return this._visible;
	}
	,set_visible: function(value) {
		this._visible = value;
		if(this._defaultDisplayStyle == "" || this._defaultDisplayStyle == "none" || this._defaultDisplayStyle == null) {
			this._defaultDisplayStyle = this.style.display;
			if(this._defaultDisplayStyle == "" || this._defaultDisplayStyle == "none") this._defaultDisplayStyle = "block";
		}
		if(this._visible) this.style.display = this._defaultDisplayStyle; else this.style.display = "none";
		return this._visible;
	}
	,getContent: function() {
		return this.getView();
	}
	,parseContent: function(useExternalContent) {
		if(useExternalContent == null) useExternalContent = true;
		var content = "";
		if(this.childElementCount == 0 || !useExternalContent) {
			content = this.translateContent(this.getContent());
			var _this = window.document;
			this._tempElement = _this.createElement("div");
		} else {
			this._useExternalContent = true;
			this._tempElement = this;
			content = this.translateContent(this.innerHTML);
		}
		this._tempElement.innerHTML = content;
		this.initSkinParts(this._tempElement);
	}
	,initSkinParts: function(target) {
		var c = js_Boot.getClass(this);
		this._skinParts = [];
		while(c != org_tamina_html_component_HTMLComponent && c != null) {
			var meta = haxe_rtti_Meta.getFields(c);
			var metaFields = Reflect.fields(meta);
			var _g1 = 0;
			var _g = metaFields.length;
			while(_g1 < _g) {
				var i = _g1++;
				var field = Reflect.field(meta,metaFields[i]);
				if(Object.prototype.hasOwnProperty.call(field,"skinpart")) {
					var element = org_tamina_utils_HTMLUtils.getElementByAttribute(target,"data-id",metaFields[i]);
					this[metaFields[i]] = element;
					if(element == null) console.log("skinpart is null: " + metaFields[i] + " from " + this.nodeName);
					this._skinParts.push(element);
				}
			}
			c = Type.getSuperClass(c);
		}
	}
	,updateSkinPartsStatus: function() {
		this._skinPartsWaiting = [];
		var _g = 0;
		var _g1 = this._skinParts;
		while(_g < _g1.length) {
			var skinPart = _g1[_g];
			++_g;
			if(org_tamina_html_component_HTMLApplication.isCustomElement(skinPart.nodeName) && skinPart.initialized != true) this._skinPartsWaiting.push(skinPart);
		}
		this._skinPartsAttached = this._skinPartsWaiting.length == 0;
		if(!this._skinPartsAttached) {
			var _g2 = 0;
			var _g11 = this._skinPartsWaiting;
			while(_g2 < _g11.length) {
				var skinPart1 = _g11[_g2];
				++_g2;
				skinPart1.addEventListener("initialize",(function(f,a1) {
					return function() {
						f(a1);
					};
				})($bind(this,this.skinPartReadyHandler),skinPart1));
			}
		}
	}
	,skinPartReadyHandler: function(skinPart) {
		HxOverrides.remove(this._skinPartsWaiting,skinPart);
		this._skinPartsAttached = this._skinPartsWaiting.length == 0;
		if(!this.creationComplete && this._skinPartsAttached) this.creationCompleteCallback();
	}
	,translateContent: function(source) {
		var content = source;
		var stringToTranslate = new RegExp("\\{\\{(?!\\}\\})(.+)\\}\\}","gim");
		var results = [];
		var result = [];
		var i = 0;
		while((result = stringToTranslate.exec(content)) != null) {
			results[i] = result;
			i++;
		}
		result = [];
		var _g = 0;
		while(_g < results.length) {
			var result1 = results[_g];
			++_g;
			var totalString = result1[0];
			var key = StringTools.trim(result1[1]);
			content = StringTools.replace(content,totalString,org_tamina_i18n_LocalizationManager.get_instance().getString(key));
		}
		return content;
	}
	,initContent: function() {
	}
	,displayContent: function() {
		var numChildren = this._tempElement.children.length;
		if(!this._useExternalContent) while(numChildren > 0) {
			numChildren--;
			var item = this._tempElement.children.item(0);
			this.appendChild(item);
		}
	}
	,__class__: org_tamina_html_component_HTMLComponent
});
var fr_thanadev_baalreturn_views_EnemyView = function() {
	org_tamina_html_component_HTMLComponent.call(this);
};
$hxClasses["fr.thanadev.baalreturn.views.EnemyView"] = fr_thanadev_baalreturn_views_EnemyView;
fr_thanadev_baalreturn_views_EnemyView.__name__ = ["fr","thanadev","baalreturn","views","EnemyView"];
fr_thanadev_baalreturn_views_EnemyView.__super__ = org_tamina_html_component_HTMLComponent;
fr_thanadev_baalreturn_views_EnemyView.prototype = $extend(org_tamina_html_component_HTMLComponent.prototype,{
	setModel: function(enemy) {
		this._model = enemy;
		this._model.modelUpdatedSignal.add($bind(this,this.modelChangedHandler));
		this.updateView();
	}
	,createdCallback: function() {
		org_tamina_html_component_HTMLComponent.prototype.createdCallback.call(this);
		this._model = null;
	}
	,modelChangedHandler: function() {
		this.updateView();
	}
	,updateView: function() {
		this._enemyName.innerText = this._model.get_name();
		this._enemyLife.innerText = Std.string(this._model.get_health());
	}
	,getView: function() {
		return "<div data-id=\"_nodeContainer\">\r\n    <h2 data-id=\"_enemyName\">Enemy Name</h2>\r\n    <p>PV : <span data-id=\"_enemyLife\"></span></p>\r\n</div>";
	}
	,__class__: fr_thanadev_baalreturn_views_EnemyView
});
var fr_thanadev_baalreturn_views_MainView = function() {
	org_tamina_html_component_HTMLComponent.call(this);
};
$hxClasses["fr.thanadev.baalreturn.views.MainView"] = fr_thanadev_baalreturn_views_MainView;
fr_thanadev_baalreturn_views_MainView.__name__ = ["fr","thanadev","baalreturn","views","MainView"];
fr_thanadev_baalreturn_views_MainView.__super__ = org_tamina_html_component_HTMLComponent;
fr_thanadev_baalreturn_views_MainView.prototype = $extend(org_tamina_html_component_HTMLComponent.prototype,{
	createdCallback: function() {
		var _g = this;
		org_tamina_html_component_HTMLComponent.prototype.createdCallback.call(this);
		this._currentNode = -1;
		fr_thanadev_baalreturn_services_PlayerService.getInstance("The new hero",100);
		fr_thanadev_baalreturn_services_EnemyService.getInstance().enemyLoaded.add($bind(this,this.enemyLoadedHandler));
		fr_thanadev_baalreturn_services_FightBusinessService.getInstance().fightEndSignal.add(function(nodeIndex) {
			_g._enemyView.set_visible(false);
			_g.loadNode(nodeIndex);
		});
		this._loader = fr_thanadev_baalreturn_dao_NodeDao.getInstance();
		this.initNodes();
	}
	,nodeLoadedHandler: function(node) {
		fr_thanadev_baalreturn_services_LoggerService.getInstance().clearArea();
		node.nextNodeChosen.add($bind(this,this.loadNode));
		this._nodes.push(node);
		this._currentNode++;
		if(this._skinPartsAttached) this.skinTimeoutHandler(); else {
			console.log("Waiting for skinparts to be attached");
			window.setTimeout($bind(this,this.skinTimeoutHandler),1);
		}
	}
	,enemyLoadedHandler: function(enemy) {
		this._enemyView.set_visible(true);
		this._enemyView.setModel(enemy);
	}
	,initNodes: function() {
		this._nodes = [];
		this.loadNode(0);
	}
	,skinTimeoutHandler: function() {
		this._enemyView.set_visible(false);
		this._nodeView.setModel(this._nodes[this._currentNode]);
		this._playerView.setModel(fr_thanadev_baalreturn_services_PlayerService.getPlayer());
	}
	,loadNode: function(nodeIndex) {
		if(nodeIndex == null) nodeIndex = -1;
		this._loader.loadNode(nodeIndex,$bind(this,this.nodeLoadedHandler));
	}
	,getView: function() {
		return "<div>\r\n    <fr-thanadev-baalreturn-views-playerview data-id=\"_playerView\" style=\"display: inline-block; border: solid 1px black\"></fr-thanadev-baalreturn-views-playerview>\r\n    <fr-thanadev-baalreturn-views-enemyview data-id=\"_enemyView\" style=\"display: inline-block; border: solid 1px black\"></fr-thanadev-baalreturn-views-enemyview>\r\n</div>\r\n<fr-thanadev-baalreturn-views-nodeview data-id=\"_nodeView\"></fr-thanadev-baalreturn-views-nodeview>";
	}
	,__class__: fr_thanadev_baalreturn_views_MainView
});
var fr_thanadev_baalreturn_views_NodeView = function() {
	org_tamina_html_component_HTMLComponent.call(this);
};
$hxClasses["fr.thanadev.baalreturn.views.NodeView"] = fr_thanadev_baalreturn_views_NodeView;
fr_thanadev_baalreturn_views_NodeView.__name__ = ["fr","thanadev","baalreturn","views","NodeView"];
fr_thanadev_baalreturn_views_NodeView.__super__ = org_tamina_html_component_HTMLComponent;
fr_thanadev_baalreturn_views_NodeView.prototype = $extend(org_tamina_html_component_HTMLComponent.prototype,{
	setModel: function(node) {
		this._model = node;
		this._model.modelUpdatedSignal.add($bind(this,this.modelChangedHandler));
		node.run();
		this.updateView();
	}
	,createdCallback: function() {
		org_tamina_html_component_HTMLComponent.prototype.createdCallback.call(this);
		fr_thanadev_baalreturn_services_LoggerService.getInstance().onLog.add($bind(this,this.displayLog));
		this._model = null;
		this._currentButtons = [];
		this.requestNode = new msignal_Signal1();
	}
	,modelChangedHandler: function() {
		this.updateView();
	}
	,decisionClickedHandler: function(event) {
		event.preventDefault();
		var button = event.target;
		var id = button.id;
		var jQButton = js.JQuery(event.target);
		id = id.split("_")[1];
		this._model.get__decisions()[Std.parseInt(id)].run();
	}
	,updateView: function() {
		var textCont = js.JQuery("#nodeText");
		textCont.text(this._model.get__text());
		var cont = js.JQuery("#decisionContainer");
		cont.text("");
		this._currentButtons = [];
		var _g = 0;
		var _g1 = this._model.get__decisions();
		while(_g < _g1.length) {
			var decision = _g1[_g];
			++_g;
			var button = cont.append("<button id='decision_" + decision.index + "'>" + decision.get__text() + "</button>");
			button.unbind();
			button.on("click",$bind(this,this.decisionClickedHandler));
			this._currentButtons.push(button);
		}
	}
	,displayLog: function(message) {
		var logArea = js.JQuery(this._nodeLog);
		logArea.text(message);
	}
	,getView: function() {
		return "<div data-id=\"_nodeContainer\">\r\n    <h2 data-id=\"_nodeName\">Node Name</h2>\r\n    <p id=\"nodeText\" data-id=\"_nodeText\">Node Text</p>\r\n    <p id=\"nodeLog\" data-id=\"_nodeLog\"></p>\r\n    <div id=\"decisionContainer\" data-id=\"_decisionContainer\">\r\n\r\n    </div>\r\n</div>";
	}
	,__class__: fr_thanadev_baalreturn_views_NodeView
});
var fr_thanadev_baalreturn_views_PlayerView = function() {
	org_tamina_html_component_HTMLComponent.call(this);
};
$hxClasses["fr.thanadev.baalreturn.views.PlayerView"] = fr_thanadev_baalreturn_views_PlayerView;
fr_thanadev_baalreturn_views_PlayerView.__name__ = ["fr","thanadev","baalreturn","views","PlayerView"];
fr_thanadev_baalreturn_views_PlayerView.__super__ = org_tamina_html_component_HTMLComponent;
fr_thanadev_baalreturn_views_PlayerView.prototype = $extend(org_tamina_html_component_HTMLComponent.prototype,{
	setModel: function(player) {
		this._model = player;
		this._model.modelUpdatedSignal.add($bind(this,this.modelChangedHandler));
		this.updateView();
	}
	,createdCallback: function() {
		org_tamina_html_component_HTMLComponent.prototype.createdCallback.call(this);
		this._model = null;
	}
	,modelChangedHandler: function() {
		this.updateView();
	}
	,updateView: function() {
		this._playerName.innerText = this._model.get_name();
		this._playerLife.innerText = Std.string(this._model.get_health());
	}
	,getView: function() {
		return "<div data-id=\"_nodeContainer\">\r\n    <h2 data-id=\"_playerName\">Player Name</h2>\r\n    <p>PV : <span data-id=\"_playerLife\"></span></p>\r\n</div>";
	}
	,__class__: fr_thanadev_baalreturn_views_PlayerView
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal_Signal;
msignal_Signal.__name__ = ["msignal","Signal"];
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
};
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal_Signal0;
msignal_Signal0.__name__ = ["msignal","Signal0"];
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal_Signal1;
msignal_Signal1.__name__ = ["msignal","Signal1"];
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal_Signal2;
msignal_Signal2.__name__ = ["msignal","Signal2"];
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal_Slot;
msignal_Slot.__name__ = ["msignal","Slot"];
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		return this.listener = value;
	}
	,__class__: msignal_Slot
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal_Slot0;
msignal_Slot0.__name__ = ["msignal","Slot0"];
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal_Slot1;
msignal_Slot1.__name__ = ["msignal","Slot1"];
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal_Slot2;
msignal_Slot2.__name__ = ["msignal","Slot2"];
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) this.nonEmpty = false; else if(head == null) {
	} else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal_SlotList;
msignal_SlotList.__name__ = ["msignal","SlotList"];
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
};
var org_tamina_events_html_MouseEventType = function() { };
$hxClasses["org.tamina.events.html.MouseEventType"] = org_tamina_events_html_MouseEventType;
org_tamina_events_html_MouseEventType.__name__ = ["org","tamina","events","html","MouseEventType"];
var org_tamina_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["org.tamina.geom.Point"] = org_tamina_geom_Point;
org_tamina_geom_Point.__name__ = ["org","tamina","geom","Point"];
org_tamina_geom_Point.prototype = {
	__class__: org_tamina_geom_Point
};
var org_tamina_html_component_HTMLComponentEventFactory = function() { };
$hxClasses["org.tamina.html.component.HTMLComponentEventFactory"] = org_tamina_html_component_HTMLComponentEventFactory;
org_tamina_html_component_HTMLComponentEventFactory.__name__ = ["org","tamina","html","component","HTMLComponentEventFactory"];
org_tamina_html_component_HTMLComponentEventFactory.createEvent = function(type) {
	var result = window.document.createEvent("Event");
	result.initEvent(type,true,true);
	return result;
};
var org_tamina_i18n_ITranslation = function() { };
$hxClasses["org.tamina.i18n.ITranslation"] = org_tamina_i18n_ITranslation;
org_tamina_i18n_ITranslation.__name__ = ["org","tamina","i18n","ITranslation"];
org_tamina_i18n_ITranslation.prototype = {
	__class__: org_tamina_i18n_ITranslation
};
var org_tamina_i18n_LocalizationManager = function() {
	this._translations = new haxe_ds_StringMap();
};
$hxClasses["org.tamina.i18n.LocalizationManager"] = org_tamina_i18n_LocalizationManager;
org_tamina_i18n_LocalizationManager.__name__ = ["org","tamina","i18n","LocalizationManager"];
org_tamina_i18n_LocalizationManager.add = function(manager) {
	org_tamina_i18n_LocalizationManager._instance = manager;
};
org_tamina_i18n_LocalizationManager.get_instance = function() {
	if(org_tamina_i18n_LocalizationManager._instance == null) org_tamina_i18n_LocalizationManager._instance = new org_tamina_i18n_LocalizationManager();
	return org_tamina_i18n_LocalizationManager._instance;
};
org_tamina_i18n_LocalizationManager.prototype = {
	setTranslations: function(translations) {
		var _g = 0;
		while(_g < translations.length) {
			var translation = translations[_g];
			++_g;
			this._translations.set(translation.fieldName,translation);
		}
	}
	,getString: function(key) {
		var result = "";
		if(this._translations.exists(key)) result = this._translations.get(key).value;
		return result;
	}
	,__class__: org_tamina_i18n_LocalizationManager
};
var org_tamina_utils_HTMLUtils = function() { };
$hxClasses["org.tamina.utils.HTMLUtils"] = org_tamina_utils_HTMLUtils;
org_tamina_utils_HTMLUtils.__name__ = ["org","tamina","utils","HTMLUtils"];
org_tamina_utils_HTMLUtils.getElementById = function(parent,id) {
	var result = null;
	if(parent.children != null) {
		var _g1 = 0;
		var _g = parent.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var el = parent.children.item(i);
			var elId = org_tamina_utils_HTMLUtils.getAttribute(el,"id");
			if(elId == id) {
				result = el;
				break;
			} else result = org_tamina_utils_HTMLUtils.getElementById(el,id);
		}
	}
	return result;
};
org_tamina_utils_HTMLUtils.getElementByAttribute = function(parent,attribute,value) {
	var result = null;
	if(parent.children != null) {
		var _g1 = 0;
		var _g = parent.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(result == null) {
				var el = parent.children.item(i);
				var elId = org_tamina_utils_HTMLUtils.getAttribute(el,attribute);
				if(elId == value) {
					result = el;
					return result;
				} else result = org_tamina_utils_HTMLUtils.getElementByAttribute(el,attribute,value);
			} else return result;
		}
	}
	return result;
};
org_tamina_utils_HTMLUtils.getAttribute = function(element,name) {
	var result = "";
	var _g1 = 0;
	var _g = element.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var att = element.attributes.item(i);
		if(att.name == name) {
			result = att.value;
			break;
		}
	}
	return result;
};
org_tamina_utils_HTMLUtils.getEventPath = function(event) {
	var result = [];
	if(event.target != null && js_Boot.__instanceof(event.target,HTMLElement)) result = org_tamina_utils_HTMLUtils.recursivelyFindParent(event.target);
	return result;
};
org_tamina_utils_HTMLUtils.recursivelyFindParent = function(element) {
	var result = [];
	result.push(element);
	if(element.nodeName.toLowerCase() != "body" && element.parentNode != null) result = result.concat(org_tamina_utils_HTMLUtils.recursivelyFindParent(element.parentNode));
	return result;
};
org_tamina_utils_HTMLUtils.findParent = function(element,doesMatch,maxLevel,currLevel) {
	if(currLevel == null) currLevel = 0;
	if(maxLevel == null) maxLevel = 10;
	if(doesMatch(element)) return element;
	if(doesMatch(element.parentElement)) return element.parentElement;
	if(++currLevel < maxLevel) return org_tamina_utils_HTMLUtils.findParent(element.parentElement,doesMatch,maxLevel,currLevel);
	return null;
};
org_tamina_utils_HTMLUtils.removeElement = function(element) {
	var result = true;
	if($bind(element,element.remove) != null) element.remove(); else if(element.parentElement != null && element.parentElement.contains(element)) element.parentElement.removeChild(element); else result = false;
	return result;
};
org_tamina_utils_HTMLUtils.getElementOffset = function(element) {
	var result = { top : 0, left : 0};
	var rect = element.getBoundingClientRect();
	var body = window.document.body;
	var win = window;
	result.top = Math.round(rect.top + win.pageYOffset - element.clientTop);
	result.left = Math.round(rect.left + win.pageXOffset - element.clientLeft);
	return result;
};
org_tamina_utils_HTMLUtils.getTouchPosition = function(element,evt) {
	var offset = org_tamina_utils_HTMLUtils.getElementOffset(element);
	var touch = evt.touches.item(0);
	return new org_tamina_geom_Point(touch.pageX - offset.left,touch.pageY - offset.top);
};
org_tamina_utils_HTMLUtils.isTouchSupported = function() {
	var result = !!(('ontouchstart' in window)
            || (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0)
            || (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0));
	return result;
};
org_tamina_utils_HTMLUtils.getBrowserType = function(agent) {
	if(agent == null) agent = window.navigator.userAgent;
	var result = org_tamina_utils_BrowserType.Unknown;
	if(new EReg("WebKit","").match(agent)) {
		if(new EReg("Chrome","").match(agent)) {
			result = org_tamina_utils_BrowserType.Chrome;
			var isAndroid = agent.indexOf("Mozilla/5.0") > -1 && agent.indexOf("Android ") > -1 && agent.indexOf("AppleWebKit") > -1;
			if(isAndroid) result = org_tamina_utils_BrowserType.Android;
		} else if(new EReg("Safari","").match(agent)) result = org_tamina_utils_BrowserType.Safari; else result = org_tamina_utils_BrowserType.Opera;
	} else if(new EReg("Opera","").match(agent)) result = org_tamina_utils_BrowserType.Opera; else if(new EReg("Mozilla","").match(agent)) {
		var isIE = agent.indexOf("MSIE ") > -1 || agent.indexOf("Trident/") > -1 || agent.indexOf("Edge/") > -1;
		var isAndroid1 = agent.indexOf("Mozilla/5.0") > -1 && agent.indexOf("Android ") > -1 && agent.indexOf("AppleWebKit") > -1;
		if(isIE) result = org_tamina_utils_BrowserType.IE; else if(isAndroid1) result = org_tamina_utils_BrowserType.Android; else result = org_tamina_utils_BrowserType.FireFox;
	} else result = org_tamina_utils_BrowserType.IE;
	return result;
};
org_tamina_utils_HTMLUtils.getIEVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var ieRegex = new EReg("MSIE\\s([0-9]+)","");
	var tridentRegex = new EReg("Trident/.*rv:([0-9]+)","");
	var edgeRegex = new EReg("Edge/([0-9]+)","");
	var regexArray = [ieRegex,tridentRegex,edgeRegex];
	var _g = 0;
	while(_g < regexArray.length) {
		var regex = regexArray[_g];
		++_g;
		if(regex.match(ua)) return Std.parseInt(regex.matched(1));
	}
	return -1;
};
org_tamina_utils_HTMLUtils.getChromeVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var chromeRegex = new EReg("Chrome/([0-9]+)","");
	if(chromeRegex.match(ua)) return Std.parseInt(chromeRegex.matched(1));
	return -1;
};
org_tamina_utils_HTMLUtils.getFirefoxVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var firefoxRegex = new EReg("Firefox/([0-9]+)","");
	if(firefoxRegex.match(ua)) return Std.parseInt(firefoxRegex.matched(1));
	return -1;
};
org_tamina_utils_HTMLUtils.getSafariVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var safariRegex = new EReg("Version/([0-9]+)","");
	if(safariRegex.match(ua)) return Std.parseInt(safariRegex.matched(1));
	return -1;
};
var org_tamina_utils_BrowserType = { __ename__ : true, __constructs__ : ["Chrome","Android","Safari","WebKitOther","FireFox","Opera","IE","Unknown"] };
org_tamina_utils_BrowserType.Chrome = ["Chrome",0];
org_tamina_utils_BrowserType.Chrome.toString = $estr;
org_tamina_utils_BrowserType.Chrome.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.Android = ["Android",1];
org_tamina_utils_BrowserType.Android.toString = $estr;
org_tamina_utils_BrowserType.Android.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.Safari = ["Safari",2];
org_tamina_utils_BrowserType.Safari.toString = $estr;
org_tamina_utils_BrowserType.Safari.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.WebKitOther = ["WebKitOther",3];
org_tamina_utils_BrowserType.WebKitOther.toString = $estr;
org_tamina_utils_BrowserType.WebKitOther.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.FireFox = ["FireFox",4];
org_tamina_utils_BrowserType.FireFox.toString = $estr;
org_tamina_utils_BrowserType.FireFox.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.Opera = ["Opera",5];
org_tamina_utils_BrowserType.Opera.toString = $estr;
org_tamina_utils_BrowserType.Opera.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.IE = ["IE",6];
org_tamina_utils_BrowserType.IE.toString = $estr;
org_tamina_utils_BrowserType.IE.__enum__ = org_tamina_utils_BrowserType;
org_tamina_utils_BrowserType.Unknown = ["Unknown",7];
org_tamina_utils_BrowserType.Unknown.toString = $estr;
org_tamina_utils_BrowserType.Unknown.__enum__ = org_tamina_utils_BrowserType;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
msignal_SlotList.NIL = new msignal_SlotList(null,null);
fr_thanadev_baalreturn_classes_actions_Action.__meta__ = { fields : { run : { 'abstract' : null}}};
fr_thanadev_baalreturn_classes_actions_ActionTarget.PLAYER = "player";
fr_thanadev_baalreturn_classes_actions_ActionTarget.ENEMY = "enemy";
fr_thanadev_baalreturn_views_EnemyView.__meta__ = { obj : { view : [""]}, fields : { _enemyName : { skinpart : null}, _enemyLife : { skinpart : null}}};
fr_thanadev_baalreturn_views_EnemyView.__registered = (function($this) {
	var $r;
	{
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		var key = "fr-thanadev-baalreturn-views-enemyview".toLowerCase();
		this1.set(key,"fr.thanadev.baalreturn.views.EnemyView");
	}
	$r = true;
	return $r;
}(this));
fr_thanadev_baalreturn_views_MainView.__meta__ = { obj : { view : [""]}, fields : { _nodeView : { skinpart : [""]}, _playerView : { skinpart : [""]}, _enemyView : { skinpart : [""]}}};
fr_thanadev_baalreturn_views_MainView.__registered = (function($this) {
	var $r;
	{
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		var key = "fr-thanadev-baalreturn-views-mainview".toLowerCase();
		this1.set(key,"fr.thanadev.baalreturn.views.MainView");
	}
	$r = true;
	return $r;
}(this));
fr_thanadev_baalreturn_views_NodeView.__meta__ = { obj : { view : [""]}, fields : { _nodeName : { skinpart : null}, _nodeText : { skinpart : null}, _nodeLog : { skinpart : null}, _nodeContainer : { skinpart : null}, _decisionContainer : { skinpart : null}}};
fr_thanadev_baalreturn_views_NodeView.__registered = (function($this) {
	var $r;
	{
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		var key = "fr-thanadev-baalreturn-views-nodeview".toLowerCase();
		this1.set(key,"fr.thanadev.baalreturn.views.NodeView");
	}
	$r = true;
	return $r;
}(this));
fr_thanadev_baalreturn_views_PlayerView.__meta__ = { obj : { view : [""]}, fields : { _playerName : { skinpart : null}, _playerLife : { skinpart : null}}};
fr_thanadev_baalreturn_views_PlayerView.__registered = (function($this) {
	var $r;
	{
		var this1 = org_tamina_html_component_HTMLApplication.get_componentsXTagList();
		var key = "fr-thanadev-baalreturn-views-playerview".toLowerCase();
		this1.set(key,"fr.thanadev.baalreturn.views.PlayerView");
	}
	$r = true;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
org_tamina_events_html_MouseEventType.CLICK = "click";
org_tamina_events_html_MouseEventType.MOUSE_MOVE = "mousemove";
org_tamina_events_html_MouseEventType.MOUSE_DOWN = "mousedown";
org_tamina_events_html_MouseEventType.MOUSE_UP = "mouseup";
org_tamina_events_html_MouseEventType.MOUSE_OUT = "mouseout";
org_tamina_events_html_MouseEventType.MOUSE_OVER = "mouseover";
org_tamina_events_html_MouseEventType.SCROLL = "scroll";
fr_thanadev_baalreturn_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
