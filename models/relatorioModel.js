import { query } from "express";
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
      inner join tb_relatorio_tipos as RT on R.RelatorioTipoId = RT.RelatorioTipoId order by R.RelatorioData desc;
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

  async getRelatorioPorId() {
    const query = "select * from tb_relatorios where RelatorioId = ?";
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) =>
        new RelatorioModel(
          row.RelatorioId,
          row.RelatorioTipoId,
          row.RelatorioData,
          row.RelatorioFiltros
        )
    )[0];
  }

  async getTiposRelatorio() {
    const query = "select * from tb_relatorio_tipos";

    let rows = await db.ExecutaComando(query);

    return rows.map((row) => ({
      id: row.RelatorioTipoId,
      nome: row.RelatorioTipoNome,
    }));
  }

  async generateRelatorioEventos() {
    let { dataDe, dataAte, status } = this.#Filtros;
    let filtrosQuery = new URLSearchParams({
      dataDe,
      dataAte,
      status,
    }).toString();
    const queryRegistro =
      "insert into tb_relatorios (RelatorioTipoId, RelatorioData, RelatorioFiltros) values (1, ?, ?)";
    const valuesRegistro = [this.#DataEmissao, filtrosQuery];
    db.ExecutaComando(queryRegistro, valuesRegistro);

    let whereValue = "";

    if (status) {
      whereValue = `E.EventoStatusId = ${status}`;
    }
    if (dataDe) {
      whereValue += `${whereValue && " and"} E.EventoData >= '${dataDe}'`;
    }
    if (dataAte) {
      whereValue += `${whereValue && " and"} E.EventoData <= '${dataAte}'`;
    }

    const queryRelatorio = `
      select E.EventoNome, E.EventoData, ES.EventoStatusDescricao from tb_eventos as E
      inner join tb_evento_status as ES on E.EventoStatusId = ES.EventoStatusId
      ${whereValue && "where " + whereValue}
    `;

    let rows = await db.ExecutaComando(queryRelatorio);

    return rows.map((row) => {
      return {
        nome: row.EventoNome,
        data: new Date(row.EventoData).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        }),
        status: row.EventoStatusDescricao,
      };
    });
  }

  async generateRelatorioPatrimonios() {
    //TODO: Pegar linhas para emissao do relatorio de patrimonios
    let { alocamento } = this.#Filtros;
    let filtrosQuery = new URLSearchParams({
      alocamento,
    }).toString();

    const queryRegistro =
      "insert into tb_relatorios (RelatorioTipoId, RelatorioData, RelatorioFiltros) values (2, ?, ?)";
    const valuesRegistro = [this.#DataEmissao, filtrosQuery];
    db.ExecutaComando(queryRegistro, valuesRegistro);

    if (alocamento === "nenhum") {
      const query =
        "select PatrimonioNome,'Não alocado' as 'EventoNome' from tb_patrimonios where PatrimonioAlocado = false";

      let rows = await db.ExecutaComando(query);
      return rows.map((row) => ({
        nome: row.PatrimonioNome,
        evento: row.EventoNome,
      }));
    }

    if (alocamento === "todos") {
      const query = `
        select PEP.PatrimonioNome, E.EventoNome 
        from (select P.PatrimonioId, P.PatrimonioNome, EP.EventoId from tb_patrimonios as P 
        left join tb_evento_patrimonio as EP on P.PatrimonioId = EP.PatrimonioId) as PEP 
        left join tb_eventos as E on PEP.EventoId = E.EventoId where E.EventoNome is not null
    `;

      let rows = await db.ExecutaComando(query);

      return rows.map((row) => ({
        nome: row.PatrimonioNome,
        evento: row.EventoNome,
      }));
    }

    const query = `
    select PEP.PatrimonioNome, E.EventoNome 
    from (select P.PatrimonioId, P.PatrimonioNome, EP.EventoId from tb_patrimonios as P 
    left join tb_evento_patrimonio as EP on P.PatrimonioId = EP.PatrimonioId) as PEP 
    left join tb_eventos as E on PEP.EventoId = E.EventoId where E.EventoId = ?;
    `;
    const values = [Number(alocamento)];

    let rows = await db.ExecutaComando(query, values);

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
