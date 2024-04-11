import { Router } from "express";
import { EventosController } from "../controllers/index.js";

let router = Router();
let ctrl = new EventosController();

//view routes
router.get("/", ctrl.listagemView);
router.get("/editar/:id", ctrl.editarView);
router.get("/cadastrar", ctrl.cadastrarView);
//mothods routes
router.get("/all", ctrl.getTodosEventos);
router.get("/:id", ctrl.getEventoPorId);
router.post("/", ctrl.addNovoEvento);
router.put("/:id", ctrl.editarEvento);
router.delete("/:id", ctrl.deleteEvento);

export default router;
