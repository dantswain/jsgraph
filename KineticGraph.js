// jsGraph - Kinetic adapter

var KineticGraph = function(stage, graph){
    this.graph = graph;
    this.stage = stage;
    this.dragging = {from: null, to: null};
    this.drag_line = new Kinetic.Line({
        points: [0, 0, 0, 0],
        stroke: 'red'
    });

    this.node_layer = new Kinetic.Layer();

    this.drag_layer = new Kinetic.Layer();
    this.drag_layer.add(this.drag_line);

    this.stage.add(this.drag_layer);
    this.stage.add(this.node_layer);
};

KineticGraph.prototype.draw = function(){
    this.drag_layer.draw();
    this.node_layer.draw();
    return this;
};

KineticGraph.prototype.doDragging = function(pos){
    if(this.dragging.from !== null){
        var from_node = this.graph.nodes[this.dragging.from];
        this.drag_line.setPoints([from_node.x, from_node.y, pos.x, pos.y]);
        this.drag_layer.draw();
    }
    return this;
};

KineticGraph.prototype.finishDragging = function(){
    if(this.dragging.from !== null && (this.dragging.from !== this.dragging.to)) {
    };
    this.dragging.from = null;
    this.dragging.to = null;
    this.drag_line.setPoints([0, 0, 0, 0]);
    this.drag_layer.draw();
    return this;
};

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
        kg.dragging = {from: node.node_index, to: null};
    });
    circle.on('mouseup', function(event){
        kg.dragging.to = node.node_index;
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
