export const dataController = {
    getProjectList: function() {
        return localProjectList;
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