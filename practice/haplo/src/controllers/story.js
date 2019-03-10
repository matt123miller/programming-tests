//@ts-check

function index(req, res) {

    res.render("index.njk");
}

function getStory(req, res){

    const { storyID } = req.params;

    res.render("index.njk", { current_story_id : storyID });
}

module.exports = {
    index,
    getStory
};