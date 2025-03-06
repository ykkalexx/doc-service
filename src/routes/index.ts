import { Router } from "express";
import { DocsControllers } from "../controllers/DocsController";

const router = Router();
const docsController = new DocsControllers();

router.post("/documents", docsController.uploadDocs);
router.get("/documents", docsController.fetchDocs);
router.delete("/documents/:id", docsController.deleteDocById);

export default router;
