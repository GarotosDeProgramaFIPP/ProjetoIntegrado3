import { ProdutoModel } from "../models/index.js";

class ProdutosController {
  //Views
  listagemView(req, res) {
    res.render("./produtos/listagem");
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
}

export default ProdutosController;
