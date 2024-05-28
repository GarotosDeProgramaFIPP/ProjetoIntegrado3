import { RelatorioModel } from "../models/index.js";
import exceljs from "exceljs";
import bluebird from "bluebird";
import libre from "libreoffice-convert";

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

  async requestReport(req, res) {
    const { tipo, ...filtros } = req.query;

    if (tipo) {
      const workbook = new exceljs.Workbook();
      const relatorioModel = new RelatorioModel(
        null,
        tipo,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        filtros
      );

      if (tipo === "1") {
        const worksheet = workbook.addWorksheet("Eventos");

        worksheet.columns = [
          { header: "Nome do Evento", key: "nome", width: 30 },
          { header: "Data do Evento", key: "data", width: 15 },
          { header: "Status do Evento", key: "status", width: 15 },
        ];

        let rows = await relatorioModel.generateRelatorioEventos();

        rows.forEach((evento) => {
          worksheet.addRow(evento);
        });
      }
      if (tipo === "2") {
        const worksheet = workbook.addWorksheet("Patrimonios");

        worksheet.columns = [
          { header: "Nome do Patrimônio", key: "nome", width: 30 },
          { header: "Evento alocado", key: "evento", width: 30 },
        ];

        let rows = await relatorioModel.generateRelatorioPatrimonios();

        rows.forEach((patrimonio) => {
          worksheet.addRow(patrimonio);
        });
      }

      if (filtros.tipoArquivo === "pdf") {
        let buffer = await workbook.xlsx.writeBuffer();

        const libreConvert = bluebird.promisify(libre.convert);

        let pdfFile = await libreConvert(buffer, ".pdf", undefined);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            `${tipo === "1" ? "eventos" : "patrimonios"}.pdf`
        );

        res.write(pdfFile);
        res.end();
        return;
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" +
          `${tipo === "1" ? "eventos" : "patrimonios"}.xlsx`
      );

      workbook.xlsx.write(res).then(() => res.end());
      return;
    }
    res.send({ ok: false, message: "Tipo de relatório não selecionado!" });
  }
}

export default RelatoriosController;
