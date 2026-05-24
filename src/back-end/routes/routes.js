import { dataController } from "../controllers/dataController.js";

export const routes = {
    "./": {
        GET: dataController.getProjectList
    }
}