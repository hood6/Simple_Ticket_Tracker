function CreateColumns(data, location) {
    for(let d in data) {
        //let col_html = '<div class="col_wrapper"';
        let col_id = data[d].col_id;
        let col_name = data[d].col_name;
        let col_html =
        `<div class="col_wrapper" id="col_${col_id}">
            <h5>${col_name}</h5>
        </div>`;
        $(location).append(col_html);
    }
}

$(document).ready(function() {
    // Why am I using URL here?
    let url = new URL(window.location);
    let url_id = url.href.split('?')[1];
    let proj_id = url_id.split('=')[1];
    console.log(proj_id);

    // This will be replaced with ajax/back-end/sp
    let projectData = [];
    for(let d in Project_Columns) {
        if(Project_Columns[d].project_id == proj_id) {
            projectData.push(Project_Columns[d]);
        }
    }

    CreateColumns(projectData, ".board_wrapper");
});