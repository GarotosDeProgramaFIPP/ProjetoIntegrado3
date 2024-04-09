import DataBase from "../utils/database.js";

let db = new DataBase();

class ProdutoModel {
  #Id;
  #Nome;
  #Valor;
  #OrigemId;

  //GETTERS
  get id() {
    return this.#Id;
  }
  get nome() {
    return this.#Nome;
  }
  get valor() {
    return this.#Valor;
  }
  get origemId() {
    return this.#OrigemId;
  }

  //SETTERS
  set id(novoValor) {
    this.#Id = novoValor;
  }
  set nome(novoValor) {
    this.#Nome = novoValor;
  }
  set valor(novoValor) {
    this.#Valor = novoValor;
  }
  set origemId(novoValor) {
    this.#OrigemId = novoValor;
  }

  constructor(id, nome, valor, origemId) {
    this.#Id = id;
    this.#Nome = nome;
    this.#Valor = valor;
    this.#OrigemId = origemId;
  }

  async getTodosProdutos() {
    const query = "select * from tb_produtos";

    let rows = await db.ExecutaComando(query);

    return rows.map(
      (row) =>
        new ProdutoModel(
          row.ProdutoId,
          row.ProdutoNome,
          row.ProdutoValor,
          row.ProdutoOrigemId
        )
    );
  }

  async getProdutoPorId() {
    const query = "select * from tb_produtos where ProdutoId = ?";
    const values = [this.#Id];

    let rows = await db.ExecutaComando(query, values);

    return rows.map(
      (row) =>
        new ProdutoModel(
          row.ProdutoId,
          row.ProdutoNome,
          row.ProdutoValor,
          row.ProdutoOrigemId
        )
    )[0];
  }

  async addNovoProduto() {
    const query =
      "inserto into tb_produtos set ProdutoNome = ?, ProdutoValor = ?, ProdutoOrigemId = ?";

    const values = [this.#Nome, this.#Valor, this.#OrigemId];

    let isAdded = await db.ExecutaComandoNonQuery(query, values);

    return isAdded;
  }

  async deleteProdutoPorId() {
    const query = "delete from tb_produtos where ProdutoId = ?";
    const values = [this.#Id];

    let isDeleted = await db.ExecutaComandoNonQuery(query, values);

    return isDeleted;
  }

  async updateProdutoPorId() {
    const query =
      "update tb_produtos set ProdutoNome = ?, ProdutoValor = ?, ProdutoOrigemId = ? where ProdutoId = ?";

    const values = [this.#Nome, this.#Valor, this.#OrigemId, this.#Id];

    let isUpdated = await db.ExecutaComandoNonQuery(query, values);

    return isUpdated;
  }

  toJSON() {
    return {
      id: this.#Id,
      nome: this.#Nome,
      valor: this.#Valor,
      origemId: this.#OrigemId,
    };
  }
}

export default ProdutoModel;
