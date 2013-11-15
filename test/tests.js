test("jsGraph Constructor", function(){
    var graph = new jsGraph();

    deepEqual(graph.constructor, jsGraph, "Creates an instance of jsGraph");
    deepEqual(graph.nodes.constructor, Array, "Has a node array");
});

test("Node Constructor", function(){
    var node = new jsGraph.Node();

    deepEqual(node.x, null, "Has null x");
    deepEqual(node.y, null, "Has null y");
    deepEqual(node.node_index, null, "Has null node_index");
    deepEqual(node.neighbors.constructor, Array, "Has a neighbors array");
});

test("jsGraph.addNode", function(){
    var graph = new jsGraph();
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
