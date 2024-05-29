import { RelatorioModel } from "../models/index.js";
import exceljs from "exceljs";
import puppeteer from "puppeteer";

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
      let relatorioHTML = "";
      const relatorioModel = new RelatorioModel(
        null,
        tipo,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        filtros
      );

      if (tipo === "1") {
        let rows = await relatorioModel.generateRelatorioEventos();

        if (filtros.tipoArquivo === "pdf") {
          let relatorioBody = "";
          rows.forEach((row) => {
            relatorioBody += `
            <tr>
              <td>${row.nome}</td>
              <td>${row.data}</td>
              <td>${row.status}</td>
            </tr>
          `;
          });
          relatorioHTML = `
            <table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="2">
              <thead>
                <tr>
                  <th>Nome do Evento</th>
                  <th>Data do Evento</th>
                  <th>Status do Evento</th>
                </tr>
              </thead>
              <tbody>
                ${relatorioBody}
              </tbody>
            </table>
          `;
        } else {
          const worksheet = workbook.addWorksheet("Eventos");
          worksheet.columns = [
            { header: "Nome do Evento", key: "nome", width: 30 },
            { header: "Data do Evento", key: "data", width: 15 },
            { header: "Status do Evento", key: "status", width: 15 },
          ];
          rows.forEach((evento) => {
            worksheet.addRow(evento);
          });
        }
      }
      if (tipo === "2") {
        let rows = await relatorioModel.generateRelatorioPatrimonios();

        if (filtros.tipoArquivo === "pdf") {
          let relatorioBody = "";
          rows.forEach((row) => {
            relatorioBody += `
          <tr>
            <td>${row.nome}</td>
            <td>${row.evento}</td>
          </tr>
        `;
          });
          relatorioHTML = `
          <table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="2">
            <thead>
              <tr>
                <th>Nome do Patrimônio</th>
                <th>Evento alocado</th>
              </tr>
            </thead>
            <tbody>
              ${relatorioBody}
            </tbody>
          </table>
        `;
        } else {
          const worksheet = workbook.addWorksheet("Patrimonios");
          worksheet.columns = [
            { header: "Nome do Patrimônio", key: "nome", width: 30 },
            { header: "Evento alocado", key: "evento", width: 30 },
          ];
          rows.forEach((patrimonio) => {
            worksheet.addRow(patrimonio);
          });
        }
      }

      if (filtros.tipoArquivo === "pdf") {
        const browser = await puppeteer.launch({
          executablePath: puppeteer.executablePath(),
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--no-first-run",
          ],
        });
        const page = await browser.newPage();
        await page.setContent(relatorioHTML, { waitUntil: "domcontentloaded" });

        const pdfBuffer = await page.pdf({
          format: "A4",
        });

        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            `${tipo === "1" ? "eventos" : "patrimonios"}.pdf`
        );
        res.write(pdfBuffer);
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
