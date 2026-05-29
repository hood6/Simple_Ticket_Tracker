export const dataModels = {
    // This will pull from Postgres once it's ready.
    getProjectList: function() {
        return JSON.stringify(localProjectList);
    }
}

// Local testing data, remove when db is ready.
const localProjectList = [
                {
                    project_id: 1,
                    project_name: "Test Project 1"
                },
                {
                    project_id: 2,
                    project_name: "Test Project 2"
                },
                {
                    project_id: 3,
                    project_name: "Test Project 3"
                }
            ];