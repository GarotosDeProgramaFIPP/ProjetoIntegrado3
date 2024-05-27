import express from "express";
import expressEjsLayout from "express-ejs-layouts";
import {
  publicasRoute,
  produtosRoute,
  eventosRoute,
  patrimoniosRoute,
  relatoriosRoute,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressEjsLayout);
app.use(cookieParser());

//gerencia bibliotecas
app.use("/jquery", express.static("./node_modules/jquery/dist/"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist/"));
app.use(
  "/bootstrap-icons",
  express.static("./node_modules/bootstrap-icons/font/")
);

//configura as rotas existentes no nosso sistema
app.use("/", publicasRoute);
app.use("/produtos", produtosRoute);
app.use("/eventos", eventosRoute);
app.use("/patrimonios", patrimoniosRoute);
app.use("/relatorios", relatoriosRoute);

//inicia o nosso servidor web
app.listen(5000, function () {
  console.log("servidor web iniciado");
});
