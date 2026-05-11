//TODO - Should make this more reusable, maybe 'CreateElement' functions in /Utils
// function CreateProjectList(data, location) {
//     let host = LOCAL_PROJECT_PAGE_LOCATION
//     for(let d in data) {
//         let url = new URL(host);
//         url.searchParams.set('id', data[d].project_id);
//         let lineItem = `<p><a href="${url.href}">${data[d].project_name}</a></p>`;
//         $(location).append(lineItem);
//     }
// }

$(document).ready(function() {
    CreateElement(Projects, ".projects_list_wrapper", "projects");
});