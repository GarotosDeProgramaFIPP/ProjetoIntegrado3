const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
let homeRoute = require("./routes/homeRoute");
let usuarioRoute = require("./routes/usuarioRoute");
let loginRoute = require("./routes/loginRoute");
const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/bootstrap", express.static("./node_modules/bootstrap/dist/"));
app.use(expressEjsLayout);

//configura as rotas existentes no nosso sistema
app.use("/", homeRoute);
app.use("/usuarios", usuarioRoute);
app.use("/login", loginRoute);

//inicia o nosso servidor web
app.listen(5000, function () {
  console.log("servidor web iniciado");
});
