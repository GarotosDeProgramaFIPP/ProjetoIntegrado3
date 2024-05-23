import DataBase from "../utils/database.js";

let db = new DataBase();

class UsuarioModel {
  #Id;
  #Nome;
  #Login;
  #Senha;
  #Telefone;
  #Endereco;
  #Documento;
  #Administrador;
  #Voluntario;

  //GETTERS
  get Id() {
    return this.#Id;
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
  get Documento() {
    return this.#Documento;
  }
  get Administrador() {
    return this.#Administrador;
  }
  get Voluntario() {
    return this.#Voluntario;
  }

  //SETTERS
  set Id(value) {
    this.#Id = value;
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
  set Documento(value) {
    this.#Documento = value;
  }
  set Administrador(value) {
    this.#Administrador = value;
  }
  set Voluntario(value) {
    this.#Voluntario = value;
  }

  constructor(
    id,
    nome,
    login,
    senha,
    telefone,
    endereco,
    documento,
    administrador,
    voluntario
  ) {
    this.#Id = id;
    this.#Nome = nome;
    this.#Login = login;
    this.#Senha = senha;
    this.#Telefone = telefone;
    this.#Endereco = endereco;
    this.#Documento = documento;
    this.#Administrador = administrador;
    this.#Voluntario = voluntario;
  }

  async getTodosVoluntarios() {
    const query = "select * from tb_usuarios_pf where UsuarioVoluntario = true";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new UsuarioModel(
          row.UsuarioId,
          row.UsuarioNome,
          row.UsuarioLogin,
          row.UsuarioSenha,
          row.UsuarioTelefone,
          row.UsuarioEndereco,
          row.UsuarioDocumento,
          row.UsuarioAdministrador,
          row.UsuarioVoluntario
        )
    );
  }

  async getUsuarioPorId() {
    const query = "select * from tb_usuarios_pf where UsuarioId = ?";
    //TODO: diferenciar pf de pj
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) =>
        new UsuarioModel(
          row.UsuarioId,
          row.UsuarioNome,
          row.UsuarioLogin,
          row.UsuarioSenha,
          row.UsuarioTelefone,
          row.UsuarioEndereco,
          row.UsuarioDocumento,
          row.UsuarioAdministrador,
          row.UsuarioVoluntario
        )
    )[0];
  }

  async getUsuarioPorLogin(userType) {
    const queryPF = `select * from tb_usuarios_pf where UsuarioLogin = ? and UsuarioSenha = ?`;
    const queryPJ = `select * from tb_usuarios_pj where UsuarioLogin = ? and UsuarioSenha = ?`;
    const values = [this.#Login, this.#Senha];

    let rows = await db.ExecutaComando(
      userType.toLowerCase() === "pf" ? queryPF : queryPJ,
      values
    );

    return rows.map(
      (row) =>
        new UsuarioModel(
          row.UsuarioId,
          row.UsuarioNome,
          row.UsuarioLogin,
          row.UsuarioSenha,
          row.UsuarioTelefone,
          row.UsuarioEndereco,
          row.UsuarioDocumento,
          row.UsuarioAdministrador,
          row.UsuarioVoluntario
        )
    )[0];
  }

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
      login: this.#Login,
      senha: this.#Senha,
      telefone: this.#Telefone,
      endereco: this.#Endereco,
      documento: this.#Documento,
      administrador: this.#Administrador,
      voluntario: this.#Voluntario,
    };
  }
}

export default UsuarioModel;
