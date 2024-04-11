import { EventoModel } from "../models/index.js";

class EventosController {
  //Views
  listagemView(req, res) {
    res.render("./eventos/listagem");
  }
  cadastrarView(req, res) {
    res.render("./eventos/cadastro");
  }
  editarView(req, res) {
    res.render("./eventos/edicao");
  }

  //Methods
  async getTodosEventos(req, res) {
    let evenModel = new EventoModel();
    let eventos = await evenModel.getTodosEventos();

    if (eventos && eventos.length) {
      res.send({
        ok: true,
        data: eventos,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async getEventoPorId(req, res) {
    const id = req.params.id;
    let evenModel = new EventoModel(id, null, null, null);

    let evento = await evenModel.getEventoPorId();

    if (evento) {
      res.send({
        ok: true,
        data: evento,
      });
      return;
    }

    res.send({
      ok: false,
      data: null,
    });
  }

  async addNovoEvento(req, res) {
    const { nome, data, statusId, usuarioId } = req.body;
    let evenModel = new EventoModel(null, nome, data, statusId, usuarioId);
    let isCreated = await evenModel.addNovoEvento();

    if (isCreated) {
      res.send({
        ok: true,
        message: "Evento adicionado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível adicionar evento",
    });
  }

  async editarEvento(req, res) {
    const { nome, data, statusId, usuarioId } = req.body;
    const id = req.params.id;
    let evenModel = new EventoModel(id, nome, data, statusId, usuarioId);
    let isUpdated = await evenModel.updateEventoPorId();

    if (isUpdated) {
      res.send({
        ok: true,
        message: "Evento alterado com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível alterar evento",
    });
  }

  async deleteEvento(req, res) {
    const id = req.params.id;
    let evenModel = new EventoModel(id, null, null, null);
    let isDeleted = await evenModel.deleteEventoPorId();

    if (isDeleted) {
      res.send({
        ok: true,
        message: "Evento excluido com sucesso!",
      });
      return;
    }
    res.send({
      ok: false,
      message: "Não foi possível excluir evento",
    });
  }
}

export default EventosController;
