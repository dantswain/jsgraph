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

    this.edge_layer = new Kinetic.Layer();

    this.stage.add(this.edge_layer);
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
    if(this.dragging.from !== null && this.dragging.to !== null && (this.dragging.from !== this.dragging.to)) {
        this.addEdge(this.dragging.from, this.dragging.to);
    };
    this.dragging.from = null;
    this.dragging.to = null;
    this.drag_line.setPoints([0, 0, 0, 0]);
    this.drag_layer.draw();
    return this;
};

KineticGraph.prototype.addEdge = function(from, to) {
    var from_node = this.graph.nodes[from];
    var to_node = this.graph.nodes[to];
    var before_edge_count = from_node.neighbors.length;
    from_node.addNeighbor(to_node);
    if(from_node.neighbors.length > before_edge_count){
        var line = new Kinetic.Line({
            points: [from_node.x, from_node.y,
                     to_node.x, to_node.y],
            stroke: 'green'
        });
        from_node.edges.push(line);
        this.edge_layer.add(line);
        this.edge_layer.draw();
    };
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
    node.edges = [];
    this.graph.addNode(node);
    this.draw();
    return this;
};
