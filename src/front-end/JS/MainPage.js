/**
 * Creates project list on document ready.
 */
$(document).ready(function() {
    let Projects = null;
    GetDataAjax("http://localhost:3000/",
        false,
        function(result){
            Projects = JSON.parse(result);
        },
        function(){
            console.log("Failed AJAX request.");
        }
    );
    if(Projects === null) {
        return;
    }
    CreateElement(Projects, ".projects_list_wrapper", "projects");
});