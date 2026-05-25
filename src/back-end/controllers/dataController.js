import { dataModels } from "../models/models.js";

export const dataController = {
    getProjectList: function() {
        return dataModels.getProjectList();
    }
}