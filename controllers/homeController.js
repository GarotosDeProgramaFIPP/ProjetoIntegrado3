
class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('home', { carros: ["corolla", "fusca", "uno com escada", "del rey"] });
    }

    contatoView(req, res) {
        res.render('contato');
    }

    semLayoutView(req, res) {
        res.render('semlayout', { layout: 'semlayout' });
    }

}

//permite que a classe homeController seja importado
export default HomeController;