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
var graph = new jsGraph.Graph();

var kinetic_graph = new KineticGraph(stage, graph);

(function(){
    // callbacks
    $("#add-nodes").click(function() {
        $(this).toggleClass("pure-button-active");

        if($(this).hasClass("pure-button-active")){
            $(this).text("Click to stop adding nodes");
            // add callback to stage
            $(stage.getContent()).click(function(event){
                kinetic_graph.addNode(getMousePosition(this, event));
            });
        } else {
            $(this).text("Click to add nodes");
            // disable the stage click callback
            $(stage.getContent()).off("click");
        };
    });

    $(stage.getContent()).mousemove(function(event){
        kinetic_graph.doDragging(getMousePosition(this, event));
    }).mouseup(function(event){
        kinetic_graph.finishDragging();
    });

})();

