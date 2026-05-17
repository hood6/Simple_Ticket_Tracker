/**JS Object used to track the state of the mousedown, mousemove and mouseup event*/
let _eventObj = {
    mousemoveOn: false,
    mouseupOn: false,
    element: null,
    startX: -1,
    startY: -1,
}

/**
 * mousedown event handler, starts the mouse event.
 * When the left mouse button is depressed, mouseup and mousemove events are allowed to fire.
 * The ticket element object to be moved is selected and the start position of the element is set.
 * 
 * @param {Object} e - mousedown event object
 */
function mousedownEvent(e) {
    _eventObj.mouseupOn = true;
    _eventObj.mousemoveOn = true;
    _eventObj.element = $(this);
    _eventObj.startX = e.pageX - _eventObj.element.offset().left;
    _eventObj.startY = e.pageY - _eventObj.element.offset().top;
}

/**
 * mousemove event handler.
 * When the mouse is moved after mousedown event has been activated, the ticket element is moved with the mouse pointer.
 * Will not activate if mousedown event has not been triggered.
 * 
 * @param {Object} e - mousemove event object
 */
function mousemoveEvent(e) {
    if(!_eventObj.mousemoveOn || !_eventObj.element || _eventObj.element === null) {
        return;
    }
    _eventObj.element.offset({
        top: e.pageY - _eventObj.startY,
        left: e.pageX - _eventObj.startX
    });
}

/**
 * mouseup event handler.
 * When the left mouse button is released, element snaps to nearest column and disables mousemove event.
 * In practice, a new element is created in the nearest column via snapToNearestColumn and the dragged element is deleted.
 * Will not activate if mousedown event has not been triggered.
 * 
 * @param {Object} e - mouseup event object
 */
function mouseupEvent(e) {
    // .plan 05/16/2026
    if(!_eventObj.mouseupOn || !_eventObj.element || _eventObj.element === null) {
        return;
    }
    _eventObj.mousemoveOn = false;
    snapToNearestColumn(_eventObj.element);
    _eventObj.element = null;
}

/**
 * Checks for nearest column to the dragged element.
 * Element and nearest column ID is passed along to moveElementToColumn to create new element in nearest column.
 * Disables mouseup event and resets mousedown event on all tickets.
 * In practice, the user will see the ticket snap to the nearest column.
 * 
 * @param {Object} element - jQuery object of the element being moved
 */
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
    // Finds nearest column to element
    $(".col_wrapper").each(function() {
        let colOffsetLeft = $(this).offset().left;
        let differenceLeft = Math.abs(element.offset().left - colOffsetLeft);
        if(nearestColLeft === -1 || nearestColLeft > differenceLeft) {
            nearestColLeft = differenceLeft;
            nearestColID = $(this).children().attr("id");
        }
    });
    // Ensures element is handled appropriately before proceeding
    await moveElementToColumn(element, nearestColID);
    _mouseupOn = false;
    $('.ticket_wrapper').off("mousedown");
    $('.ticket_wrapper').on("mousedown", mousedownEvent);
}

/**
 * Appends element to the new column before disposing of the dragged element.
 * 
 * @param {Object} element - jQuery object of the element being moved
 * @param {string} newColID - Column ID that the element will be appended to
 * @returns - Promise to ensure element is properly handled before proceeding
 */
function moveElementToColumn(element, newColID) {
    return new Promise((resolve) => {
        let elementHTML = `<div class="ticket_wrapper">${element.html()}</div>`;
        $(`#${newColID}`).append(elementHTML);
        let ret = element.remove();
        resolve(ret);
    });
}