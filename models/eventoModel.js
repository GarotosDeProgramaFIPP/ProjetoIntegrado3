import DataBase from "../utils/database.js";

let db = new DataBase();

class EventoModel {
  #Id;
  #Nome;
  #Data;
  #StatusId;
  #UsuarioId;

  constructor(id, nome, data, statusId, usuarioId) {
    this.#Id = id;
    this.#Nome = nome;
    this.#Data = data;
    this.#StatusId = statusId;
    this.#UsuarioId = usuarioId;
  }

  get Id() {
    return this.#Id;
  }

  set Id(id) {
    this.#Id = id;
  }

  get Nome() {
    return this.#Nome;
  }

  set Nome(nome) {
    this.#Nome = nome;
  }

  get Data() {
    return this.#Data;
  }

  set Data(data) {
    this.#Data = data;
  }

  get StatusId() {
    return this.#StatusId;
  }

  set StatusId(statusId) {
    this.#StatusId = statusId;
  }

  get UsuarioId() {
    return this.#UsuarioId;
  }

  set UsuarioId(usuarioId) {
    this.#UsuarioId = usuarioId;
  }

  async getTodosEventos() {
    const query = "select * from tb_eventos";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new EventoModel(
          row.EventoId,
          row.EventoNome,
          row.EventoData,
          row.EventoStatusId,
          row.UsuarioId
        )
    );
  }

  async getEventoPorId() {
    const query = "select * from tb_eventos where EventoId = ?";
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) =>
        new EventoModel(
          row.EventoId,
          row.EventoNome,
          row.EventoData,
          row.EventoStatusId,
          row.UsuarioId
        )
    )[0];
  }

  async addNovoEvento() {
    const query =
      "insert into tb_eventos set EventoNome = ?, EventoData = ?, EventoStatusId = ?, UsuarioId = ?";

    const values = [this.#Nome, this.#Data, this.#StatusId, this.#UsuarioId];

    let isAdded = await db.ExecutaComandoNonQuery(query, values);

    return isAdded;
  }

  async deleteEventoPorId() {
    const query = "delete from tb_eventos where EventoId = ?";
    const values = [this.#Id];

    let isDeleted = await db.ExecutaComandoNonQuery(query, values);

    return isDeleted;
  }

  async updateEventoPorId() {
    const query =
      "update tb_eventos set EventoNome = ?, EventoData = ?, EventoStatusId = ?, UsuarioId = ?";

    const values = [this.#Nome, this.#Data, this.#StatusId, this.#UsuarioId];

    let isUpdated = await db.ExecutaComandoNonQuery(query, values);

    return isUpdated;
  }

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
      data: this.#Data,
      statusId: this.#StatusId,
      usuarioId: this.#UsuarioId,
    };
  }
}

export default EventoModel;
