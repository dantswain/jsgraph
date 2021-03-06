// jsGraph - Kinetic adapter

var KineticGraph = function(stage, graph){
    this.graph = graph;
    this.stage = stage;
    this.dragging = {from: null, to: null};
    this.drag_line = new Kinetic.Polygon({
        points: [0, 0, 0, 0],
        stroke: 'red', fill: 'red'
    });
    this.circle_radius = 6;

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
        this.drag_line.setPoints(this.pointsForArrow(from_node, pos, 0));
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
        var line = new Kinetic.Polygon({
            points: this.pointsForArrow(from_node, to_node, this.circle_radius),
            stroke: 'green', fill: 'green'
        });
        from_node.edges.push(line);
        this.edge_layer.add(line);
        this.edge_layer.draw();
    };
    return this;
};

KineticGraph.prototype.pointsForArrow = function(from, to, backoff_radius){
    var angle = Math.atan2(to.y - from.y, to.x - from.x);
    var length = Math.sqrt((to.x - from.x)*(to.x - from.x) + (to.y - from.y)*(to.y - from.y));
    var head_width = 2*this.circle_radius;
    var head_length = 2*this.circle_radius;
    var fudge = 1.25;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var tip_x = from.x + (length - fudge*backoff_radius)*cos;
    var tip_y = from.y + (length - fudge*backoff_radius)*sin;
    var p_1_x = tip_x - head_length*cos;
    var p_1_y = tip_y - head_length*sin;
    var p_2_x = p_1_x - 0.5*head_width*sin;
    var p_2_y = p_1_y + 0.5*head_width*cos;
    var p_3_x = p_1_x + 0.5*head_width*sin;
    var p_3_y = p_1_y - 0.5*head_width*cos;

    return [from.x, from.y, p_1_x, p_1_y, p_2_x, p_2_y, tip_x, tip_y,
            p_3_x, p_3_y, p_1_x, p_1_y, from.x, from.y];
            
};

KineticGraph.prototype.addCircleToNode = function(node, callbacks){
    var kg = this;
    var circle = new Kinetic.Circle({
        x: node.x, y: node.y, radius: this.circle_radius,
        fill: 'blue', stroke: 'blue',
        strokeWidth: 1
    });
    circle.on('mouseover', function(){
        this.setStroke('black');
        if(callbacks !== undefined && callbacks.mouseover !== undefined){
            callbacks.mouseover(node);
        };
        kg.draw();
    });
    circle.on('mouseout', function(){
        this.setStroke('blue');
        if(callbacks != undefined && callbacks.mouseout !== undefined){
            callbacks.mouseout(node);
        };
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

KineticGraph.prototype.addNode = function(pos, callbacks){
    var node = new jsGraph.Node(pos);
    this.addCircleToNode(node, callbacks);
    node.edges = [];
    this.graph.addNode(node);
    this.draw();
    return this;
};
