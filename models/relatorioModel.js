import DataBase from "../utils/database.js";

let db = new DataBase();

class RelatorioModel {
  #Id;
  #Tipo;
  #DataEmissao;
  #Filtros;

  //GETTERS
  get Id() {
    return this.#Id;
  }
  get Tipo() {
    return this.#Tipo;
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
  set Tipo(tipo) {
    this.#Tipo = tipo;
  }
  set DataEmissao(dataEmissao) {
    this.#DataEmissao = dataEmissao;
  }
  set Filtros(filtros) {
    this.#Filtros = filtros;
  }

  constructor(id, tipo, dataEmissao, filtros) {
    this.#Id = id;
    this.#Tipo = tipo;
    this.#DataEmissao = dataEmissao;
    this.#Filtros = filtros;
  }

  async getTodosRelatorios() {
    const query = `
      select R.RelatorioId, RT.RelatorioTipoNome, R.RelatorioData, R.RelatorioFiltros from tb_relatorios as R
      inner join tb_relatorio_tipos as RT on R.RelatorioTipoId = RT.RelatorioTipoId;
    `;

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new RelatorioModel(
          row.RelatorioId,
          row.RelatorioTipoNome,
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
      return {
        nome: row.EventoNome,
        data: row.EventoData,
        status: row.EventoStatus,
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
      tipo: this.#Tipo,
      dataEmissao: this.#DataEmissao,
      filtros: this.#Filtros,
    };
  }
}

export default RelatorioModel;
