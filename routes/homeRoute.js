import { Router } from "express";
import { HomeController } from "../controllers/index.js";

const router = Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);

export default router;
