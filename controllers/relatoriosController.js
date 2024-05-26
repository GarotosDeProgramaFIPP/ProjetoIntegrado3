import { RelatorioModel } from "../models/index.js";

class RelatoriosController {
  listagemView(req, res) {
    res.render("./relatorios/listagem");
  }
  async getTodosRelatorios(req, res) {
    const relatorioModel = new RelatorioModel();

    let relatorios = await relatorioModel.getTodosRelatorios();

    if (relatorios) {
      res.send({ ok: true, data: relatorios });
      return;
    }
    res.send({ ok: false, message: "Não foi possível encontrar relatórios" });
  }

  async getTipoRelatorios(req, res) {
    const relatorioModel = new RelatorioModel();

    let tipos = await relatorioModel.getTiposRelatorio();

    if (tipos) {
      res.send({ ok: true, data: tipos });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível encontrar tipos de relatórios",
    });
  }
}

export default RelatoriosController;
