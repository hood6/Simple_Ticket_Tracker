let _eventObj = {
    mousedownOn: true,
    mousemoveOn: false,
    mouseupOn: false,
    element: null,
    startX: -1,
    startY: -1,
}

function mousedownEvent(e) {
    _eventObj.mouseupOn = true;
    _eventObj.mousemoveOn = true;
    _eventObj.element = $(this);
    _eventObj.startX = e.pageX - _eventObj.element.offset().left;
    _eventObj.startY = e.pageY - _eventObj.element.offset().top;
}

function mousemoveEvent(e) {
    if(!_eventObj.mousemoveOn || !_eventObj.element || _eventObj.element === null) {
        return;
    }
    _eventObj.element.offset({
        top: e.pageY - _eventObj.startY,
        left: e.pageX - _eventObj.startX
    });
}

function mouseupEvent(e) {
    // DO NOT USE .off, CREATE A VARIABLE TO DETERMINE WHEN TO IGNORE EVENTS!
    // https://stackoverflow.com/questions/18298083/turning-all-events-off-and-on-in-jquery
    if(!_eventObj.mouseupOn || !_eventObj.element || _eventObj.element === null) {
        return;
    }
    _eventObj.mousemoveOn = true;
    snapToNearestColumn(_eventObj.element); // May need to change this to just _eventObj and handle the entire obj.
    _eventObj.element = null; // Doubtful if this will remove the element.  Is this a shallow or deep copy?
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
    $('.ticket_wrapper').off("mousedown");
    $('.ticket_wrapper').on("mousedown", mousedownEvent);
}

function moveElementToColumn(element, newColID) {
    return new Promise((resolve) => {
        let elementHTML = `<div class="ticket_wrapper">${element.html()}</div>`;
        $(`#${newColID}`).append(elementHTML);
        let ret = element.remove();
        resolve(ret);
    });
}