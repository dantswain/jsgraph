var jsGraph = (function(){
    var addNode = function(node){
        if(node.node_index == null) {
            node.node_index = this.nodes.length;
            this.nodes.push(node);
        }
        return this;
    };

    var eachNode = function(callback){
        var ix;
        for(ix = 0; ix < this.nodes.length; ix++){
            callback(this.nodes[ix]);
        }
        return this;
    };
    
    var jsGraph = function() {
        this.nodes = new Array;
        this.addNode = addNode;
        this.eachNode = eachNode;
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

    var Node = function(pos) {
        this.x = null;
        this.y = null;

        if(pos !== undefined){
            if(pos.x === undefined || pos.y === undefined) {
                throw new Error("pos.x and pos.y must be defined");
            }
            this.x = pos.x;
            this.y = pos.y;
        }

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
