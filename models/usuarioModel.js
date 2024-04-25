import DataBase from "../utils/database.js";

let db = new DataBase();

class UsuarioModel {
    #Id;
    #PerfilId;
    #Nome;
    #Login;
    #Senha;
    #Telefone;
    #Endereco;

    //GETTERS
    get Id() {
        return this.#Id;
    }
    get PerfilId() {
        return this.#PerfilId;
    }
    get Nome() {
        return this.#Nome;
    }
    get Login() {
        return this.#Login;
    }
    get Senha() {
        return this.#Senha;
    }
    get Telefone() {
        return this.#Telefone;
    }
    get Endereco() {
        return this.#Endereco;
    }

    //SETTERS
    set Id(value) {
        this.#Id = value;
    }
    set PerfilId(value) {
        this.#PerfilId = value;
    }
    set Nome(value) {
        this.#Nome = value;
    }
    set Login(value) {
        this.#Login = value;
    }
    set Senha(value) {
        this.#Senha = value;
    }
    set Telefone(value) {
        this.#Telefone = value;
    }
    set Endereco(value) {
        this.#Endereco = value;
    }

    constructor(id, perfilId, nome, login, senha, telefone, endereco) {
        this.#Id = id;
        this.#PerfilId = perfilId;
        this.#Nome = nome;
        this.#Login = login;
        this.#Senha = senha;
        this.#Telefone = telefone;
        this.#Endereco = endereco;
    }

    toJSON() {
        return {
            id: this.#Id,
            perfilId: this.#PerfilId,
            nome: this.#Nome,
            login: this.#Login,
            senha: this.#Senha,
            telefone: this.#Telefone,
            endereco: this.#Endereco
        };
    }
}

export default UsuarioModel;
