import { Router } from "express";
import * as adminController from "../controllers/adminController";

const router = Router();

router.get("/dashboard", adminController.getDashboardData);

export default router;
