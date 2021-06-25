//@ts-check

const StoryController = require("./controllers/story");


function setupRoutes(app) {

    app.get('/', StoryController.index);

    app.get('/:fragmentID', StoryController.getFragment);
    app.post('/:direction', StoryController.postFragment);

    return app;
}

module.exports = {
    setupRoutes
}