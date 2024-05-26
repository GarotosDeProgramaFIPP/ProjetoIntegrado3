import { EventoModel, PatrimonioModel } from "../models/index.js";

class PatrimoniosController {
  //Views
  listagemView(req, res) {
    res.render("./patrimonios/listagem");
  }
  cadastrarView(req, res) {
    res.render("./patrimonios/cadastro");
  }
  async editarView(req, res) {
    let evenModel = new EventoModel();

    const eventosNaoFinalizados = await evenModel
      .getTodosEventos()
      .then((r) => r.filter((evento) => evento.StatusNome !== "Finalizado"));

    res.render("./patrimonios/edicao", { eventos: eventosNaoFinalizados });
  }
  async alocarView(req, res) {
    let patriModel = new PatrimonioModel();
    let evenModel = new EventoModel();

    const patrimoniosDisponiveis = await patriModel
      .getTodosPatrimonios()
      .then((r) => r.filter((patrimonio) => !Boolean(patrimonio.Alocado)));

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
    let patrimonios = await patriModel.getTodosPatrimoniosENomeDeEventos();

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
      let response = patrimonio.toJSON();
      if (patrimonio.Alocado) {
        let eventoId = await patriModel.getNomeEventoAlocadoPorPatrimonioId();
        response.eventoAlocadoId = eventoId;
      }
      res.send({
        ok: true,
        data: response,
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
    const { nome, evento } = req.body;
    const id = req.params.id;
    let patriModel = new PatrimonioModel(id, nome);
    let isUpdated = await patriModel.updatePatrimonioPorId(evento);

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

  async alocarPatrimonio(req, res) {
    const { patrimonio, evento } = req.body;

    if (patrimonio !== "0" && evento !== "0") {
      let patriModel = new PatrimonioModel();
      let isAlocated = await patriModel.alocarPatrimonio(patrimonio, evento);

      if (isAlocated) {
        res.send({
          ok: true,
          message: "Patrimonio alocado ao evento com sucesso!",
        });
        return;
      }
      res.send({
        ok: false,
        message: "Não foi possível alocar patrimonio ao evento!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Patrimonio e Evento obrigatórios para alocação!",
    });
  }
}

export default PatrimoniosController;
