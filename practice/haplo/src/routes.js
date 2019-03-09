const HomeController = require("./controllers/home");


function setupRoutes(app) {

    app.get('/', (req, res) => {

        return res.render('index.njk', { first_name: 'Hello Dan' });
    });

    app.get('/index', HomeController.index);

    return app;
}

module.exports = {
    setupRoutes
}