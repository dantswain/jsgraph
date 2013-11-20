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
                kinetic_graph.addNode(getMousePosition(this, event), {
                    mouseover: function(node){
                        highlightColumn("#laplacian", node.node_index);
                        $("#laplacian-row-" + node.node_index).addClass("row-hover");
                        highlightCell("#laplacian", node.node_index, node.node_index);
                    },
                    mouseout: function(node){
                        unHighlightColumn("#laplacian", node.node_index);
                        $("#laplacian-row-" + node.node_index).removeClass("row-hover");
                        unHighlightCell("#laplacian", node.node_index, node.node_index);
                    }
                });
                var num_nodes = kinetic_graph.graph.nodes.length;
                $("#num_nodes").text(num_nodes + (num_nodes > 1 ? ' nodes' : ' node'));
		showLaplacian();
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
	showLaplacian();
    });

    function highlightColumn(table, index){
        eachRowTd(table, index, function(td){
            $(td).addClass("col-hover");
        });
    };

    function unHighlightColumn(table, index){
        eachRowTd(table, index, function(td){
            $(td).removeClass("col-hover");
        });
    };

    function highlightCell(table, row_index, col_index){
        $(table).find("tr:eq(" + row_index + ") td:eq(" + col_index + ")").addClass("both-hover");
    };

    function unHighlightCell(table, row_index, col_index){
        $(table).find("tr:eq(" + row_index + ") td:eq(" + col_index + ")").removeClass("both-hover");
    };

    function eachRowTd(table, col_index, callback){
        $(table).find("td").each(function(ix, td){
            if($(td).index() === col_index){
                callback(td);
            };
        });
    };

    function showLaplacian(){
	$("#laplacian_label").show();
        $("#laplacian_container").html(
            kinetic_graph.graph.toTable(document, 'matrix', 'laplacian')
        );
    };

})();

