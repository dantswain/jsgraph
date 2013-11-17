// jsGraph - Kinetic adapter

var KineticGraph = function(stage, graph){
    this.graph = graph;
    this.stage = stage;

    this.node_layer = new Kinetic.Layer();
    this.stage.add(this.node_layer);
};

KineticGraph.prototype.draw = function(){
    this.node_layer.draw();
}

KineticGraph.prototype.addCircleToNode = function(node){
    var kg = this;
    var circle = new Kinetic.Circle({
        x: node.x, y: node.y, radius: 7,
        fill: 'blue', stroke: 'blue',
        strokeWidth: 1
    });
    circle.on('mouseover', function(){
        this.setStroke('black');
        kg.draw();
    });
    circle.on('mouseout', function(){
        this.setStroke('blue');
        kg.draw();
    });
    circle.on('mousedown', function(){
//        dragging_from = this.node_index;
//        dragging_to = dragging_from;
//        dragging = true;
    });
    circle.on('mouseup', function(event){
//       dragging_to = this.node_index;
//       event.cancelBubble = true;
    });
    node.circle = circle;
    this.node_layer.add(circle);
    return node;
};

KineticGraph.prototype.addNode = function(pos){
    var node = new jsGraph.Node(pos);
    this.addCircleToNode(node);
    this.graph.addNode(node);
    this.draw();
    return this;
};
