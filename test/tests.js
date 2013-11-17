test("jsGraph.Graph Constructor", function(){
    var graph = new jsGraph.Graph();

    deepEqual(graph.constructor, jsGraph.Graph, "Creates an instance of jsGraph");
    deepEqual(graph.nodes.constructor, Array, "Has a node array");
});

test("jsGraph.Graph.getLaplacian", function(){
    var empty_graph = new jsGraph.Graph();
    deepEqual(empty_graph.getLaplacian(), [], "Returns an empty array for an empty Graph");

    var graph = new jsGraph.Graph();
    var node0 = new jsGraph.Node();
    graph.addNode(node0);
    deepEqual(graph.getLaplacian(), [[0]], "Returns a single-element zero matrix for a graph with one node");

    var node1 = new jsGraph.Node();
    graph.addNode(node1);
    deepEqual(graph.getLaplacian(), [[0, 0],[0, 0]], "Returns a matrix of zeros for a graph with no edges.");

    node0.addNeighbor(node1);
    deepEqual(graph.getLaplacian(), [[1, -1], [0, 0]], "Handles a single edge");

    node1.addNeighbor(node0);
    deepEqual(graph.getLaplacian(), [[1, -1], [-1, 1]], "Handles a simple two-node graph");

    var node2 = new jsGraph.Node();
    graph.addNode(node2);
    deepEqual(graph.getLaplacian(), [[1, -1, 0], [-1, 1, 0], [0, 0, 0]],
              "Handles adding a disconnected node");

    node0.addNeighbor(node2);
    deepEqual(graph.getLaplacian(), [[1, -0.5, -0.5], [-1, 1, 0], [0, 0, 0]],
              "Row normalizes");
});


test("Node Constructor - no arguments", function(){
    var node = new jsGraph.Node();

    deepEqual(node.x, null, "Has null x");
    deepEqual(node.y, null, "Has null y");
    deepEqual(node.node_index, null, "Has null node_index");
    deepEqual(node.neighbors.constructor, Array, "Has a neighbors array");
});

test("Node Constructor - position argument", function(){
    var pos = {x: 0, y: 1};
    var node = new jsGraph.Node(pos);

    deepEqual(node.x, 0, "Has the x position set");
    deepEqual(node.y, 1, "Has the y position set");
    deepEqual(node.node_index, null, "Has null node_index");
    deepEqual(node.neighbors.constructor, Array, "Has a neighbors array");

    raises(function(){new jsGraph.Node({x: 0})}, Error, "Throws an error if the y position is not specified");
    raises(function(){new jsGraph.Node({y: 0})}, Error, "Throws an error if the x position is not specified");
});

test("jsGraph.addNode", function(){
    var graph = new jsGraph.Graph();
    var node = new jsGraph.Node();

    var out = graph.addNode(node);
    deepEqual(graph.nodes[graph.nodes.length - 1], node, "Adds the node at the end of the nodes list");
    deepEqual(node.node_index, 0, "Sets the node index");
    deepEqual(out, graph, "Returns the graph for chaining");

    graph.addNode(node);
    deepEqual(graph.nodes.length, 1, "Doesn't add a node twice");
    deepEqual(node.node_index, 0, "Doesn't change the node index on repeat adds");
});

test("jsGraph.Node.addNeighbor", function(){
    var node0 = new jsGraph.Node();
    var node1 = new jsGraph.Node();
    node0.node_index = 0;
    node1.node_index = 1;

    var out = node0.addNeighbor(node1);

    deepEqual(node0.neighbors, [node1], "Adds to the list of neighbors");
    deepEqual(out, node0, "Returns the node for chaining");
    deepEqual(node1.neighbors, [], "Does not add the reverse edge");

    deepEqual(node0.addNeighbor(node0).neighbors, [node1], "Doesn't allow self loops");
    deepEqual(node0.addNeighbor(node1).neighbors, [node1], "Doesn't allow duplicate edges");
});


test("jsGraph.Node.eachNeighbor", function(){
    var node0 = new jsGraph.Node();  node0.node_index = 0;
    var node1 = new jsGraph.Node();  node1.node_index = 1;
    var node2 = new jsGraph.Node();  node2.node_index = 2;

    node0.addNeighbor(node1).addNeighbor(node2);

    var accum = new Array;
    var out = node0.eachNeighbor(function(neighbor){
        accum.push(neighbor);
    });

    deepEqual(accum, [node1, node2], "Calls the callback for each neighbor");
    deepEqual(out, node0, "Returns the node for chaining");
});

test("jsGraph.eachNode", function(){
    var graph = new jsGraph.Graph();

    graph.addNode(new jsGraph.Node()).addNode(new jsGraph.Node()).addNode(new jsGraph.Node());

    var accum = new Array;
    var out = graph.eachNode(function(node){
        accum.push(node.node_index);
    });
    
    deepEqual(out, graph, "Returns the graph for chaining");
    deepEqual(accum, [0, 1, 2], "Calls the callback for each node");
});
