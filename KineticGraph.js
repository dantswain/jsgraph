// jsGraph - Kinetic adapter

var KineticGraph = function(stage, graph){
    this.graph = graph;
    this.stage = stage;

    this.node_layer = new Kinetic.Layer();
    this.stage.add(this.node_layer);
};

KineticGraph.prototype.addNode = function(pos){
    var node = new jsGraph.Node(pos);
    this.graph.addNode(node);
};
