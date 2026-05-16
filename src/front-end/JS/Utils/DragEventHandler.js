const _STANDARD_TOP_OFFSET = 122.933334; //In case column is empty.
const _TOP_OFFSET_BETWEEN_TICKETS = 76;

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
        snapToNearestColumn(element);
    });
}

// Why does this fire off n+1 times???
function snapToNearestColumn(element) {
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
    let nearestColLeft = -1, nearestColTop = -1, nearestColID = -1;
    $(".col_wrapper").each(function() {
        let colOffsetLeft = $(this).offset().left;
        let differenceLeft = Math.abs(element.offset().left - colOffsetLeft);
        if(nearestColLeft === -1 || nearestColLeft > differenceLeft) {
            nearestColLeft = differenceLeft;
            nearestColID = $(this).children().attr("id");
        }
    });
    //console.log(nearestColID);
    /*
        Next is to set ticket at bottom of column
        Get left ticket offset for column
        Find lowest ticket via top offset
        Set ticket offset to just below the other tickets
    */
    //let nearestColHTML = `#col_${nearestColID}`;
    let columnChildren = $(`#${nearestColID}`).children();
    let ticketOffsetLeft = columnChildren.offset().left;
    let lowestTicketOffsetTop = 0;
    columnChildren.each(function() {
        lowestTicketOffsetTop = $(this).offset().top;
    });
    element.offset({
        top: lowestTicketOffsetTop + _TOP_OFFSET_BETWEEN_TICKETS,
        left: ticketOffsetLeft
    });
}