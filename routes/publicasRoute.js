import { Router } from "express";
import { PublicasController } from "../controllers/index.js";

let router = Router();
let ctrl = new PublicasController();
router.get("/", ctrl.homeView);
router.get("/sobre", ctrl.sobreView);
router.get("/causas", ctrl.causasView);
router.get("/posts", ctrl.postsView);
router.get("/doacao", ctrl.doacaoView);
router.get("/contato", ctrl.contatoView);
router.get("/login", ctrl.loginView);

export default router;
