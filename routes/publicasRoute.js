import { Router } from "express";
import { PublicasController } from "../controllers/index.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

let router = Router();
let ctrl = new PublicasController();
let auth = new AuthMiddleware();

router.get("/", auth.verificarUsuarioLogado, ctrl.homeView);
router.get("/causas", auth.verificarUsuarioLogado, ctrl.causasView);
router.get("/ajude", auth.verificarUsuarioLogado, ctrl.ajudeView);
router.get("/doacao", auth.verificarUsuarioLogado, ctrl.doacaoView);
router.get("/contato", auth.verificarUsuarioLogado, ctrl.contatoView);
router.get("/login", auth.verificarUsuarioLogado, ctrl.loginView);
router.get("/cadastro", auth.verificarUsuarioLogado, ctrl.cadastroView);
router.post("/cadastro", auth.verificarUsuarioLogado, ctrl.addNovoUsuario);
router.get("/logout", auth.verificarUsuarioLogado, ctrl.logout);
router.post("/login", ctrl.realizarLogin);

export default router;
