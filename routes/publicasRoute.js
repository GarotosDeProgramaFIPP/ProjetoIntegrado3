import { Router } from "express";
import { PublicasController } from "../controllers/index.js";

let router = Router();
let ctrl = new PublicasController();
router.get("/", ctrl.homeView);
router.get("/causas", ctrl.causasView);
router.get("/ajude", ctrl.ajudeView);
router.get("/doacao", ctrl.doacaoView);
router.get("/contato", ctrl.contatoView);
router.get("/login", ctrl.loginView);
router.get("/cadastro", ctrl.cadastroView);

export default router;
