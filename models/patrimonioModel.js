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

  async getTodosPatrimoniosENomeDeEventos() {
    const query = `
      select PEP.PatrimonioId, PEP.PatrimonioNome, E.EventoNome 
      from (select P.PatrimonioId, P.PatrimonioNome, EP.EventoId from tb_patrimonios as P 
	    left join tb_evento_patrimonio as EP on P.PatrimonioId = EP.PatrimonioId) as PEP 
      left join tb_eventos as E on PEP.EventoId = E.EventoId;
    `;
    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new PatrimonioModel(
          row.PatrimonioId,
          row.PatrimonioNome,
          row.EventoNome
        )
    );
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

  async updatePatrimonioPorId(eventoId) {
    if (eventoId) {
      // Remove alocação
      if (eventoId === "0") {
        //Deleta relacionamento entre o patrimonio e evento
        const queryDeletarRelacionamento =
          "delete from tb_evento_patrimonio where PatrimonioId = ?";
        const valuesDeletarRelacionamento = [this.#Id];
        const isDeleted = await db.ExecutaComandoNonQuery(
          queryDeletarRelacionamento,
          valuesDeletarRelacionamento
        );

        //Atualiza nome e status de alocação do patrimonio
        const queryAtualizaPatrimonio =
          "update tb_patrimonios set PatrimonioNome = ?, PatrimonioAlocado = false where PatrimonioId = ?";
        const valuesAtualizaPatrimonio = [this.#Nome, this.#Id];
        const isUpdated = db.ExecutaComandoNonQuery(
          queryAtualizaPatrimonio,
          valuesAtualizaPatrimonio
        );

        return isDeleted && isUpdated;
      }

      //Atualiza alocação
      //Atualiza relacionamento entre o patrimonio e evento
      const queryAtualizarRelacionamento =
        "update tb_evento_patrimonio set EventoId = ? where PatrimonioId = ?";
      const valuesAtualizarRelacionamento = [eventoId, this.#Id];
      const isUpdatedRelacionamento = await db.ExecutaComandoNonQuery(
        queryAtualizarRelacionamento,
        valuesAtualizarRelacionamento
      );

      //Atualiza nome do patrimonio
      const queryAtualizaPatrimonio =
        "update tb_patrimonios set PatrimonioNome = ? where PatrimonioId = ?";
      const valuesAtualizaPatrimonio = [this.#Nome, this.#Id];
      const isUpdatedPatrimonio = db.ExecutaComandoNonQuery(
        queryAtualizaPatrimonio,
        valuesAtualizaPatrimonio
      );

      return isUpdatedRelacionamento && isUpdatedPatrimonio;
    }

    //Atualiza nome de patrimonio não alocado
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

  async getNomeEventoAlocadoPorPatrimonioId() {
    const query = `
      select E.EventoId 
      from (select EP.EventoId from tb_patrimonios as P 
      inner join tb_evento_patrimonio as EP on P.PatrimonioId = EP.PatrimonioId where EP.PatrimonioId = ?) as PEP 
      inner join tb_eventos as E on PEP.EventoId = E.EventoId;
    `;

    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows[0].EventoId;
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
