import { Router } from "express";
import { DocsControllers } from "../controllers/DocsController";
import { ProjectsController } from "../controllers/ProjectsController";

const router = Router();
const docsController = new DocsControllers();
const projectsController = new ProjectsController();

// Document routes
router.post("/documents", docsController.uploadDocs);
router.get("/documents", docsController.fetchDocs);
router.delete("/documents/:id", docsController.deleteDocById);

// Project routes
router.post("/projects", projectsController.createProject);
router.get("/projects", projectsController.getAllProjects);
router.get("/projects/:id", projectsController.getProjectById);
router.put("/projects/:id", projectsController.updateProject);
router.delete("/projects/:id", projectsController.deleteProject);

export default router;
