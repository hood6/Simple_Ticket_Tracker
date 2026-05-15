const _BOARD_LOCATION = '.board_wrapper';

$(document).ready(function() {
    // Why am I using URL here?
    // It may be a better idea to use window.location.pathname going forward.
    let url = new URL(window.location);
    let url_id = url.href.split('?')[1];
    let proj_id = url_id.split('=')[1];

    // This will be replaced with ajax/back-end/sp
    for(let i in Project_Columns){
        if(Project_Columns[i].project_id == proj_id){
            CreateElement(Project_Columns[i], _BOARD_LOCATION, "column");
            for(let j in Tickets){
                if(Tickets[j].project_id == proj_id && Tickets[j].col_id == Project_Columns[i].col_id){
                    CreateElement(Tickets[j], `#col_${Project_Columns[i].col_id}`, "ticket")
                }
            }
        }
    }
    // This works for dragging elements around, but not super well, and only for the first ticket.
    let isDown = false;
    $('.ticket_wrapper').on("click", function() {
        let childID = $(this).children().attr("id");
        console.log(`Ticket ${childID} was clicked.`);
    });

    // const draggableElements = $('.ticket_wrapper');
    // for(let i = 0; i < draggableElements.length; i++) {
    //     draggableElements[i].on("click", function() {
    //         console.log(`Ticket ${i} was clicked.`);
    //     });
    // }

    // for(let i = 0; i < dragElement.length; i++) {
    //     dragElement[i].addEventListener('mousedown', function(){
    //         isDown = true;
    //     });
    // }
    // window.addEventListener('mouseup', function(){
    //     isDown = false;
    // });
    // window.addEventListener('mousemove', function() {
    //     for(let i = 0; i < dragElement.length; i++) {
    //         if (isDown) {
    //             dragElement[i].style.top = event.clientY + 'px';
    //             dragElement[i].style.left = event.clientX + 'px';
    //         }
    //     }
    // });
});

