import DataBase from "../utils/database.js";

let db = new DataBase();

class EventoModel {
  #Id;
  #Nome;
  #Data;
  #StatusId;
  #StatusNome;

  constructor(id, nome, data, statusId, statusNome) {
    this.#Id = id;
    this.#Nome = nome;
    this.#Data = data;
    this.#StatusId = statusId;
    this.#StatusNome = statusNome;
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

  get StatusNome() {
    return this.#StatusNome;
  }

  set StatusNome(statusNome) {
    this.#StatusNome = statusNome;
  }

  async getTodosEventos() {
    const query =
      "select E.*, S.EventoStatusDescricao from tb_eventos as E inner join tb_evento_status as S on E.EventoStatusId = S.EventoStatusId";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new EventoModel(
          row.EventoId,
          row.EventoNome,
          row.EventoData,
          row.EventoStatusId,
          row.EventoStatusDescricao
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
          row.EventoStatusId
        )
    )[0];
  }

  async addNovoEvento() {
    const query =
      "insert into tb_eventos set EventoNome = ?, EventoData = ?, EventoStatusId = ?";

    const values = [this.#Nome, this.#Data, this.#StatusId];

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
      "update tb_eventos set EventoNome = ?, EventoData = ?, EventoStatusId = ? where EventoId = ?";

    const values = [this.#Nome, this.#Data, this.#StatusId, this.#Id];

    let isUpdated = await db.ExecutaComandoNonQuery(query, values);

    return isUpdated;
  }

  async getEventoStatus() {
    const query = "select * from tb_evento_status";

    let rows = await db.ExecutaComando(query);

    return rows.map((row) => ({
      eventoStatusId: row.EventoStatusId,
      eventoStatusDescricao: row.EventoStatusDescricao,
    }));
  }

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
      data: this.#Data,
      statusId: this.#StatusId,
      statusNome: this.#StatusNome,
    };
  }
}

export default EventoModel;
