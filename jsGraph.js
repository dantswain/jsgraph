var jsGraph = (function(){
    var addNode = function(node){
        if(node.node_index == null) {
            node.node_index = this.nodes.length;
            this.nodes.push(node);
        }
        return this;
    };
    
    var jsGraph = function() {
        this.nodes = new Array;
        this.addNode = addNode;
    };

    jsGraph.prototype = {
        constructor: jsGraph
    };

    return jsGraph;
})();

jsGraph.Node = (function(){
    var Node = function() {
        this.x = null;
        this.y = null;
        this.node_index = null;
        this.neighbors = new Array;
    };

    Node.prototype = {
        constructor: Node
    };

    return Node;
})();
