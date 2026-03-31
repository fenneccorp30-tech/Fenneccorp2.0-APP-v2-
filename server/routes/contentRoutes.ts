import { Router } from "express";
import * as contentController from "../controllers/contentController";

const router = Router();

router.get("/", contentController.getAllContent);
router.get("/hero", contentController.getHeroContent);
router.get("/about", contentController.getAboutContent);

export default router;
