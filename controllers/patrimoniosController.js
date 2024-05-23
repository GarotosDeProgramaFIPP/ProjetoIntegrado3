import { EventoModel, PatrimonioModel } from "../models/index.js";

class PatrimoniosController {
  //Views
  listagemView(req, res) {
    res.render("./patrimonios/listagem");
  }
  cadastrarView(req, res) {
    res.render("./patrimonios/cadastro");
  }
  editarView(req, res) {
    res.render("./patrimonios/edicao");
  }
  async alocarView(req, res) {
    let patriModel = new PatrimonioModel();
    let evenModel = new EventoModel();

    const patrimoniosDisponiveis = await patriModel
      .getTodosPatrimonios()
      .then((r) =>
        r.filter((patrimonio) => !Boolean(patrimonio.Alocado))
      );

    const eventosNaoFinalizados = await evenModel
      .getTodosEventos()
      .then((r) => r.filter((evento) => evento.StatusNome !== "Finalizado"));

    res.render("./patrimonios/alocacao", {
      patrimonios: patrimoniosDisponiveis,
      eventos: eventosNaoFinalizados,
    });
  }

  //Methods
  async getTodosPatrimonios(req, res) {
    let patriModel = new PatrimonioModel();
    let patrimonios = await patriModel.getTodosPatrimonios();

    if (patrimonios && patrimonios.length) {
      res.send({
        ok: true,
        data: patrimonios,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async getPatrimonioPorId(req, res) {
    const id = req.params.id;
    let patriModel = new PatrimonioModel(id, null);

    let patrimonio = await patriModel.getPatrimonioPorId();

    if (patrimonio) {
      res.send({
        ok: true,
        data: patrimonio,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async addNovoPatrimonio(req, res) {
    const { nome } = req.body;
    let patriModel = new PatrimonioModel(null, nome);
    let isCreated = await patriModel.addNovoPatrimonio();

    if (isCreated) {
      res.send({
        ok: true,
        message: "Patrimonio adicionado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível adicionar patrimonio",
    });
  }

  async editarPatrimonio(req, res) {
    const { nome } = req.body;
    const id = req.params.id;
    let patriModel = new PatrimonioModel(id, nome);
    let isUpdated = await patriModel.updatePatrimonioPorId();

    if (isUpdated) {
      res.send({
        ok: true,
        message: "Patrimonio alterado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível alterar patrimonio",
    });
  }

  async deletePatrimonio(req, res) {
    const id = req.params.id;
    let patriModel = new PatrimonioModel(id, null);
    let isDeleted = await patriModel.deletePatrimonioPorId();

    if (isDeleted) {
      res.send({
        ok: true,
        message: "Patrimonio excluido com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível excluir patrimonio",
    });
  }
}

export default PatrimoniosController;
