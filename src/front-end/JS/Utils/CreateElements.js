function CreateElement(data, location, type){
    switch(type) {
        case "column":
            _CreateColumn(data, location);
            break;
        case "ticket":
            _CreateTicket(data, location);
            break;
        case "projects":
            _CreateProjectList(data, location);
            break;
        default:
            //TODO - error log
            console.log(`${type} is not recognized as a type.`);
    }
}

function _CreateColumn(data, location) {
    let col_id = `col_${data.col_id}`;
    let col_name = data.col_name;
    let col_html =
    `<div class="col_wrapper">
        <div id="${col_id}">
            <h5>${col_name}</h5>
        </div>
    </div>`;
    $(location).append(col_html);
}

function _CreateTicket(data, location) {
    let ticket_id = data.ticket_id;
    let ticket_name = data.ticket_name;
    let ticket_html = 
    `<div class="ticket_wrapper">
        <div id="${ticket_id}">
            <h6>${ticket_name}</h6>
        </div>
    </div>`;
    $(location).append(ticket_html);
}

// URL functionality here: https://dev.to/olaleyeblessing/create-dynamic-urls-with-url-constructor-in-javascript-2o9l
function _CreateProjectList(data, location) {
    let host = LOCAL_PROJECT_PAGE_LOCATION
    for(let d in data) {
        let url = new URL(host);
        url.searchParams.set('id', data[d].project_id);
        let lineItem = `<p><a href="${url.href}">${data[d].project_name}</a></p>`;
        $(location).append(lineItem);
    }
}