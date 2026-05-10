//TODO - Should make this more reusable, maybe 'CreateElement' functions in /Utils
function CreateProjectList(data, location) {
    let host = `file:///C:/Users/William%20Hood/Documents/Code_Projects/Simple_Ticket_Tracker/Simple_Ticket_Tracker/src/front-end/HTML/ProjectPage.html`
    for(let d in data) {
        let url = new URL(host);
        url.searchParams.set('id', data[d].project_id);
        let lineItem = `<p><a href="${url.href}">${data[d].project_name}</a></p>`;
        $(location).append(lineItem);
    }
}

$(document).ready(function() {
    CreateProjectList(Projects, ".projects_list_wrapper");
});