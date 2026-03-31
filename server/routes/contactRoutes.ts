import { Router } from "express";
import { submitContactForm, subscribeNewsletter } from "../controllers/contactController";

const router = Router();

router.post("/", submitContactForm);
router.post("/newsletter", subscribeNewsletter);

export default router;
