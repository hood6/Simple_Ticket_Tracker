const _BOARD_LOCATION = '.board_wrapper';

/**
 * Creates columns and tickets on document ready, as well as initializing the mouse event listeners.
 */
$(document).ready(function() {
    let url = window.location.href;
    let url_id = url.split('?')[1];
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
    
    $('.ticket_wrapper').on("mousedown", mousedownEvent);
    $(document).on("mousemove", mousemoveEvent);
    $(document).on("mouseup", mouseupEvent);
});

