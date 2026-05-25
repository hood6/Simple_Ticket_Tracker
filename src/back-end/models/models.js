export const dataModels = {
    getProjectList: function() {
        return JSON.stringify(localProjectList);
    }
}

const localProjectList = [
                {
                    project_id: 1,
                    project_name: "Test Project 1"
                },
                {
                    project_id: 2,
                    project_name: "Test Project 2"
                }
            ]