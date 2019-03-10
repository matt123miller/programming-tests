const StoryController = require("./controllers/story");


function setupRoutes(app) {

    app.get('/', StoryController.index);

    app.get('/:storyID', StoryController.getStory);

    return app;
}

module.exports = {
    setupRoutes
}