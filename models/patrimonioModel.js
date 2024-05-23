import DataBase from "../utils/database.js";

let db = new DataBase();

class PatrimonioModel {
  #Id;
  #Nome;
  #Alocado;

  constructor(id, nome, alocado) {
    this.#Id = id;
    this.#Nome = nome;
    this.#Alocado = alocado;
  }

  get Id() {
    return this.#Id;
  }

  set Id(newId) {
    this.#Id = newId;
  }

  get Nome() {
    return this.#Nome;
  }

  set Nome(newNome) {
    this.#Nome = newNome;
  }

  get Alocado() {
    return this.#Alocado;
  }

  set Alocado(value) {
    this.#Alocado = value;
  }

  async getTodosPatrimonios() {
    const query = "select * from tb_patrimonios";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new PatrimonioModel(
          row.PatrimonioId,
          row.PatrimonioNome,
          row.PatrimonioAlocado
        )
    );
  }

  async getPatrimonioPorId() {
    const query = "select * from tb_patrimonios where PatrimonioId = ?";
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) =>
        new PatrimonioModel(
          row.PatrimonioId,
          row.PatrimonioNome,
          row.PatrimonioAlocado
        )
    )[0];
  }

  async addNovoPatrimonio() {
    const query =
      "insert into tb_patrimonios (PatrimonioNome, PatrimonioAlocado) values (?, false)";

    const values = [this.#Nome];

    let isAdded = await db.ExecutaComandoNonQuery(query, values);

    return isAdded;
  }

  async deletePatrimonioPorId() {
    const query = "delete from tb_patrimonios where PatrimonioId = ?";
    const values = [this.#Id];

    let isDeleted = await db.ExecutaComandoNonQuery(query, values);

    return isDeleted;
  }

  async updatePatrimonioPorId() {
    const query =
      "update tb_patrimonios set PatrimonioNome = ? where PatrimonioId = ?";

    const values = [this.#Nome, this.#Id];

    let isUpdated = await db.ExecutaComandoNonQuery(query, values);

    return isUpdated;
  }

  async alocarPatrimonio(patrimonioId, eventoId) {
    const queryUpdatePatrimonio =
      "update tb_patrimonios set PatrimonioAlocado = true where PatrimonioId = ?";
    const valuesUpdatePatrimonio = [patrimonioId];

    let isUpdated = await db.ExecutaComandoNonQuery(
      queryUpdatePatrimonio,
      valuesUpdatePatrimonio
    );

    const queryAddAlocacao =
      "insert into tb_evento_patrimonio (PatrimonioId, EventoId) values (?, ?)";
    const valuesAddAlocacao = [patrimonioId, eventoId];

    let isAdded = await db.ExecutaComandoNonQuery(
      queryAddAlocacao,
      valuesAddAlocacao
    );

    return isUpdated && isAdded;
  }

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
      alocado: this.#Alocado,
    };
  }
}

export default PatrimonioModel;
