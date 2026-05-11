function CreateElement(data, location, type){
    switch(type) {
        case "columns":
            _CreateColumns(data, location);
            break;
        case "tickets":
            _CreateTickets(data, location);
            break;
        case "projects":
            _CreateProjectList(data, location);
            break;
        default:
            //TODO - error log
            console.log(`${type} is not recognized as a type.`);
    }
}

function _CreateColumns(data, location) {
    for(let d in data) {
        let col_id = data[d].col_id;
        let col_name = data[d].col_name;
        let col_html =
        `<div class="col_wrapper" id="col_${col_id}">
            <h5>${col_name}</h5>
        </div>`;
        $(location).append(col_html);
    }
}

function _CreateTickets(data, location) {
    
}

function _CreateProjectList(data, location) {
    let host = LOCAL_PROJECT_PAGE_LOCATION
    for(let d in data) {
        let url = new URL(host);
        url.searchParams.set('id', data[d].project_id);
        let lineItem = `<p><a href="${url.href}">${data[d].project_name}</a></p>`;
        $(location).append(lineItem);
    }
}