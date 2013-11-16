(function(){
    // Kinetic variables set up
    var stage = new Kinetic.Stage({
        container: 'container',
        width: $('#container').width(),
        height: $('#contianer').height()
    });

    var node_layer = new Kinetic.Layer();
    stage.add(node_layer);

    // our graph
    var graph = new jsGraph();
    
    // callbacks
    $("#add-nodes").click(function() {
        $(this).toggleClass("pure-button-active");

        if($(this).hasClass("pure-button-active")){
            $(this).text("Click to stop adding nodes");
            // add callback to stage
            $(stage.getContent()).click(function(event){
            });
        } else {
            $(this).text("Click to add nodes");
            // disable the stage click callback
            $(stage.getContent()).off("click");
        };
    });

})();

