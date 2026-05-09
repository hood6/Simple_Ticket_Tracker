function CreateProjectList(data, location) {
    for(let d in data) {
        let lineItem = `<p>${data[d].project_name}</p>`;
        $(location).append(lineItem);
    }
}

$(document).ready(function() {
    CreateProjectList(Projects, ".projects_list_wrapper");
});