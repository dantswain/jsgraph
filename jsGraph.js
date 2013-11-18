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

    this.Graph.prototype.getLaplacian = function(){
        var lap = [];
        var num_nodes = this.nodes.length;
        var proto_row = [];
        for(var ix = 0; ix < num_nodes; ix++){
            proto_row.push(0);
        };

        this.eachNode(function(node){
            var row = proto_row.slice(0);
            var num_neighbors = node.neighbors.length;
            node.eachNeighbor(function(neighbor){
                row[neighbor.node_index] = -1/num_neighbors;
            });
            if(node.neighbors.length > 0){
                row[node.node_index] = 1;
            };
            lap.push(row);
        });

        return lap;
    };

    this.Graph.prototype.toTable = function(doc, klass, id){
        var tbl = doc.createElement('table')
        tbl.setAttribute('class', klass);
        tbl.setAttribute('id', id);

        var lap = this.getLaplacian();
        // insertRow means we have to go backwards
        for(var row_ix = lap.length-1; row_ix >= 0; row_ix--){
            var tr = tbl.insertRow();
            tr.setAttribute('id', id + '-row-' + row_ix);
            // same with insertCell
            for(var col_ix = lap[row_ix].length - 1; col_ix >= 0; col_ix--){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(lap[row_ix][col_ix].toPrecision(2)));
            };
        };

        return tbl;
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

