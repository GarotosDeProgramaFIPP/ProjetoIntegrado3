import { Router } from 'express';
import HomeController from '../controllers/homeController.js';

const router = Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/contato", ctrl.contatoView);
router.get('/semlayout', ctrl.semLayoutView);

export default router;