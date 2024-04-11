import DataBase from "../utils/database.js";

let db = new DataBase();

class PatrimonioModel {
  #Id;
  #Nome;

  constructor(id, nome) {
    this.#Id = id;
    this.#Nome = nome;
  }

  get id() {
    return this.#Id;
  }

  set id(newId) {
    this.#Id = newId;
  }

  get nome() {
    return this.#Nome;
  }

  set nome(newNome) {
    this.#Nome = newNome;
  }

  async getTodosPatrimonios() {
    const query = "select * from tb_patrimonios";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) => new PatrimonioModel(row.PatrimonioId, row.PatrimonioNome)
    );
  }

  async getPatrimonioPorId() {
    const query = "select * from tb_patrimonios where PatrimonioId = ?";
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) => new PatrimonioModel(row.PatrimonioId, row.PatrimonioNome)
    )[0];
  }

  async addNovoPatrimonio() {
    const query = "insert into tb_patrimonios set PatrimonioNome = ?";

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

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
    };
  }
}

export default PatrimonioModel;
