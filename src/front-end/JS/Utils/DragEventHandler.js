let _mousedownOn = true;
let _mousemoveOn = false;
let _mouseupOn = false;

function dragEvent(e) {
    _mouseupOn = true;
    _mousemoveOn = true;
    let element = $(this);
    let startX = e.pageX - element.offset().left;
    let startY = e.pageY - element.offset().top;

    $(document).on("mousemove", function(e){
        if(!_mousemoveOn || !element || element === null) {
            console.log("mousemove cannot fire");
            return;
        }
        element.offset({
            top: e.pageY - startY,
            left: e.pageX - startX
        });
    });

    $(document).on("mouseup", function(e) {
        // There's something about switching stuff on/off that is messing with the event firing.
        // May need to switch events on/off during the course of the drag.
        // DO NOT USE .off, CREATE A VARIABLE TO DETERMINE WHEN TO IGNORE EVENTS!
        // https://stackoverflow.com/questions/18298083/turning-all-events-off-and-on-in-jquery
        if(!_mouseupOn || !element || element === null) {
            console.log("mouseup cannot fire");
            return;
        }
        _mousemoveOn = false;
        snapToNearestColumn(element);
        element = null;
    });
}

// Why does this fire off n+1 times???
async function snapToNearestColumn(element) {
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
    // TODO - Need to look into this, something is going on with the iteration causing some elements to get doubled over and over
    $(".col_wrapper").each(function() {
        let colOffsetLeft = $(this).offset().left;
        let differenceLeft = Math.abs(element.offset().left - colOffsetLeft);
        if(nearestColLeft === -1 || nearestColLeft > differenceLeft) {
            nearestColLeft = differenceLeft;
            nearestColID = $(this).children().attr("id");
        }
    });
    await moveElementToColumn(element, nearestColID)
    _mouseupOn = false;
    // trying to reset the mousedown event
    // sometimes multiple elements are appended, wth?
    $('.ticket_wrapper').on("mousedown", dragEvent);
}

function moveElementToColumn(element, newColID) {
    return new Promise((resolve) => {
        let elementHTML = `<div class="ticket_wrapper">${element.html()}</div>`;
        $(`#${newColID}`).append(elementHTML);
        let ret = element.remove();
        resolve(ret);
    });
}