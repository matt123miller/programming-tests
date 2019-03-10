//@ts-check

let storyCache = {};

const directions = {
    north: 1,
    east: 2,
    south: 3,
    west: 4
};


function index(req, res) {

    res.render("index.njk");
}

function getFragment(req, res) {

    const { fragmentID } = req.params;

    // Later add directions by getting existing fragments out of storyCache
    const fragmentData = { 
        current_story_id : fragmentID ,
        north: true
    };

    res.render("index.njk", fragmentData);
}

function postFragment(req, res) {

    console.log(req.body);
    const { fragmentID, direction } = req.params;


    
    const newID = computeFragmentHash(fragmentID, direction);

    console.log(newID);



    res.render('index.njk', {north: direction});
}

// Can easily be swapped out for something more robust later.
function computeFragmentHash(fragmentID, direction) {
    return `${fragmentID}-${direction}`;
}


module.exports = {
    index,
    getFragment,
    postFragment
};