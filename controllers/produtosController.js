import { ProdutoModel } from "../models/index.js";

class ProdutosController {
  //Views
  listagemView(req, res) {
    res.render("./produtos/listagem");
  }

  editarView(req, res) {
    res.render("./produtos/editar");
  }

  //Methods
  async getTodosProdutos(req, res) {
    let prodModel = new ProdutoModel();
    let produtos = await prodModel.getTodosProdutos();

    if (produtos && produtos.length) {
      res.send({
        ok: true,
        data: produtos,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async getProdutoPorId(req, res) {
    const id = req.params.id;
    let prodModel = new ProdutoModel(id, null, null, null);

    let produto = await prodModel.getProdutoPorId();

    if (produto) {
      res.send({
        ok: true,
        data: produto,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async addNovoProduto(req, res) {
    const { nome, valor, origemId } = req.body;
    let prodModel = new ProdutoModel(null, nome, valor, origemId);
    let isCreated = await prodModel.addNovoProduto();

    if (isCreated) {
      res.send({
        ok: true,
        message: "Produto adicionado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível adicionar poduto",
    });
  }

  async editarProduto(req, res) {
    const { nome, valor, origemId } = req.body;
    const id = req.params.id;
    let prodModel = new ProdutoModel(id, nome, valor, origemId);
    let isUpdated = await prodModel.updateProdutoPorId();

    if (isUpdated) {
      res.send({
        ok: true,
        message: "Produto alterado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível alterar poduto",
    });
  }

  async deleteProduto(req, res) {
    const id = req.params.id;
    let prodModel = new ProdutoModel(id, null, null, null);
    let isDeleted = await prodModel.deleteProdutoPorId();

    if (isDeleted) {
      res.send({
        ok: true,
        message: "Produto excluido com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível excluir poduto",
    });
  }
}

export default ProdutosController;
