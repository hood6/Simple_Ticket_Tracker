function dragEvent(e) {
    let element = $(this);
    let startX = e.pageX - element.offset().left;
    let startY = e.pageY - element.offset().top;

    $(document).on("mousemove", function(e){
        element.offset({
            top: e.pageY - startY,
            left: e.pageX - startX
        });
    });

    $(document).on("mouseup", function() {
        $(document).off("mousemove");
        snapToNearestColumn(element.offset());
    });
}

// Why does this fire off n+1 times???
function snapToNearestColumn(elementOffset) {
    /*
        Ticket position (offset) passed in
        Get nearest column position
            - Can you do this with a ray?
        ---
        *These next three do not need to happen right away*
        *For now, set the ticket at the bottom*
        Get nearest ticket position in that column
        Set moving ticket position above nearest ticket
        Move tickets below moving ticket
        ---
        *Do this after the ability to save has been implemented*
        Set moving ticket's col_id to new column
            - Both data obj and parent element
    */
    let nearestColLeft = -1, nearestColTop = -1, nearestColID = "";
    $(".col_wrapper").each(function() {
        let colOffsetLeft = $(this).offset().left;
        let differenceLeft = Math.abs(elementOffset.left - colOffsetLeft);
        if(nearestColLeft === -1 || nearestColLeft > differenceLeft) {
            nearestColLeft = differenceLeft;
            nearestColID = $(this).children().attr("id");
        }
    });
    //console.log(nearestColID);
}