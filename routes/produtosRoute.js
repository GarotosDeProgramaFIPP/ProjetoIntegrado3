import { Router } from "express";
import { ProdutosController } from "../controllers/index.js";

let router = Router();
let ctrl = new ProdutosController();

router.get("/", ctrl.listagemView);
router.get("/all", ctrl.getTodosProdutos);

export default router;
