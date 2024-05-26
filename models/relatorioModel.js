import DataBase from "../utils/database.js";

let db = new DataBase();

class RelatorioModel {
  #Id;
  #TipoId;
  #DataEmissao;
  #Filtros;

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
  get Filtros() {
    return this.#Filtros;
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
  set Filtros(filtros) {
    this.#Filtros = filtros;
  }

  constructor(id, tipoId, dataEmissao, filtros) {
    this.#Id = id;
    this.#TipoId = tipoId;
    this.#DataEmissao = dataEmissao;
    this.#Filtros = filtros;
  }

  async getTodosRelatorios() {
    const query = "select * from tb_relatorios";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new RelatorioModel(
          row.RelatorioId,
          row.RelatorioTipoId,
          row.RelatorioData,
          row.RelatorioFiltros
        )
    );
  }

  async getTiposRelatorio() {
    const query = "select * from tb_relatorio_tipos";

    let rows = await db.ExecutaComando(query);

    return rows.map((row) => ({
      id: row.RelatorioTipoId,
      nome: row.RelatorioTipoNome,
    }));
  }

  async getRelatorioEventos() {
    //TODO: Pegar linhas para emissao do relatorio de eventos

    let rows = [];

    return rows.map((row) => {
      let patrimonios = ""; //Pensar como agrupar os eventos concatenando seus patrimonios
      return {
        nome: row.EventoNome,
        data: row.EventoData,
        status: row.EventoStatus,
        patrimonios,
      };
    });
  }

  async getRelatorioPatrimonios() {
    //TODO: Pegar linhas para emissao do relatorio de patrimonios

    let rows = [];

    return rows.map((row) => ({
      nome: row.PatrimonioNome,
      evento: row.EventoNome,
    }));
  }

  toJSON() {
    return {
      id: this.#Id,
      tipoId: this.#TipoId,
      dataEmissao: this.#DataEmissao,
      filtros: this.#Filtros,
    };
  }
}

export default RelatorioModel;
