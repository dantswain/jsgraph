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
    var addNeighbor = function(other_node){
        if((other_node != this) && (this.neighbors.indexOf(other_node) == -1)){
            this.neighbors.push(other_node);
        }
        return this;
    };

    var eachNeighbor = function(callback){
        var ix;
        for(ix = 0; ix < this.neighbors.length; ix++){
            callback(this.neighbors[ix]);
        }
        return this;
    };

    var Node = function() {
        this.x = null;
        this.y = null;
        this.node_index = null;
        this.neighbors = new Array;
        this.addNeighbor = addNeighbor;
        this.eachNeighbor = eachNeighbor;
    };

    Node.prototype = {
        constructor: Node
    };

    return Node;
})();
