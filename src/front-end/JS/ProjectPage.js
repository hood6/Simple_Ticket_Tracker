// function CreateColumns(data, location) {
//     for(let d in data) {
//         //let col_html = '<div class="col_wrapper"';
//         let col_id = data[d].col_id;
//         let col_name = data[d].col_name;
//         let col_html =
//         `<div class="col_wrapper" id="col_${col_id}">
//             <h5>${col_name}</h5>
//         </div>`;
//         $(location).append(col_html);
//     }
// }

// function CreateTickets(data, location) {

// }
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
});