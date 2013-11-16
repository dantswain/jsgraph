var jsGraph = (function(){
    this.Graph = function(){
        this.nodes = [];
    };

    this.Graph.prototype.addNode = function(node){
        if(node.node_index == null) {
            node.node_index = this.nodes.length;
            this.nodes.push(node);
        }
        return this;
    };

    this.Graph.prototype.eachNode = function(callback){
        var ix;
        for(ix = 0; ix < this.nodes.length; ix++){
            callback(this.nodes[ix]);
        }
        return this;
    };

    this.Node = function(pos){
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
    };

    this.Node.prototype.addNeighbor = function(other_node){
        if((other_node != this) && (this.neighbors.indexOf(other_node) == -1)){
            this.neighbors.push(other_node);
        }
        return this;
    };

    this.Node.prototype.eachNeighbor = function(callback){
        var ix;
        for(ix = 0; ix < this.neighbors.length; ix++){
            callback(this.neighbors[ix]);
        }
        return this;
    };

    return this;
})();

