import DataBase from "../utils/database.js";

let db = new DataBase();

class RelatorioModel {
  #Id;
  #TipoId;
  #DataEmissao;
  #UsuarioId;

  //GETTERS
  get Id() {
    return this.#Id;
  }
  get TipoId() {
    return this.#TipoId;
  }
  get DataEmissao() {
    return this.#DataEmissao;
  }
  get UsuarioId() {
    return this.#UsuarioId;
  }

  //SETTERS
  set Id(id) {
    this.#Id = id;
  }
  set TipoId(tipoId) {
    this.#TipoId = tipoId;
  }
  set DataEmissao(dataEmissao) {
    this.#DataEmissao = dataEmissao;
  }
  set UsuarioId(usuarioId) {
    this.#UsuarioId = usuarioId;
  }

  constructor(id, tipoId, dataEmissao, usuarioId) {
    this.#Id = id;
    this.#TipoId = tipoId;
    this.#DataEmissao = dataEmissao;
    this.#UsuarioId = usuarioId;
  }

  toJSON() {
    return {
      id: this.#Id,
      tipoId: this.#TipoId,
      dataEmissao: this.#DataEmissao,
      usuarioId: this.#UsuarioId,
    };
  }
}
