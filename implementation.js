function getMousePosition(obj, evt) {
    var rect = obj.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// NOTE - making these global for debugging

// kinetic stage
var stage = new Kinetic.Stage({
    container: 'container',
    width: $('#container').width(),
    height: $('#container').height()
});
// our graph
var graph = new jsGraph();

(function(){
    // Kinetic variables set up
    var node_layer = new Kinetic.Layer();
    stage.add(node_layer);

    
    // callbacks
    $("#add-nodes").click(function() {
        $(this).toggleClass("pure-button-active");

        if($(this).hasClass("pure-button-active")){
            $(this).text("Click to stop adding nodes");
            // add callback to stage
            $(stage.getContent()).click(function(event){
                var pos = getMousePosition(this, event);
                var node = new jsGraph.Node();
                node.x = pos.x;
                node.y = pos.y
                graph.addNode(node);
            });
        } else {
            $(this).text("Click to add nodes");
            // disable the stage click callback
            $(stage.getContent()).off("click");
        };
    });

})();

