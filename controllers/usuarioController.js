const UserModel = require('../models/userModel');
let userModel = new UserModel();
class UsuarioController{

    async getAllUsers(req, resp){
        let users = await userModel.getAllUsers();
        resp.send(users);
    }

    getUserByName(req, resp){}

    listagemView(req, resp){
        resp.render("usuarios/listagem");
    }

    cadastroView(req, resp){
        resp.render("usuarios/cadastro");
    }

    cadastrar(req, resp){
        let msg = "";
        let cor = "";
        if(req.body.usuarioEmail != "" && req.body.usuarioSenha != "" && req.body.usuarioNome != "" &&
        req.body.usuarioTipo != '0') {
            msg = "Usuário cadastrado com sucesso!";
            cor = "color:green;";
        }
        else
        {
            msg = "Erro ao cadastrar usuário! Os dados do usuário não foram informados corretamente";
            cor = "color:red;";
        }
        
        resp.render('usuarios/cadastro', {msg: msg, cor:cor});
    }


}

module.exports = UsuarioController;