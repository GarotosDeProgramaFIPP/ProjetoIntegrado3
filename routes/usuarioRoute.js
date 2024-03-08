const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

let ctrl = new UsuarioController();

let router = express.Router();
router.get('/',ctrl.listagemView);
router.get('/cadastrar',ctrl.cadastroView);
router.post('/cadastrar',ctrl.cadastrar);
router.get('/users', ctrl.getAllUsers);
router.get('/user/', ctrl.getUserByName);

module.exports = router;