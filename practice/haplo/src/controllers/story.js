//@ts-check

let storyCache = {
    '0': { text: 'This is where your story begins' },
    '01': {},
    '02': {},
    '03': {},
    '04': {},
};

const directions = {
    north: 1,
    east: 2,
    south: 3,
    west: 4
};



function index(req, res) {

    const currentStoryFragments = buildTemplatingData(0);
    console.log({ currentStoryFragments });

    res.render("index.njk", currentStoryFragments);
}

function getFragment(req, res) {

    const fragmentID = req.params.fragmentID || 0;

    const currentStoryFragments = buildTemplatingData(fragmentID);

    console.log('getfragment call')
    console.log({ currentStoryFragments });

    res.render("index.njk", currentStoryFragments);
}

function postFragment(req, res) {


    const bodyDirection = Object.keys(req.body)[0]; // potentially use a filter and loop the directions object?
    const currentStoryId = req.body.currentStoryId;
    const directionKey = directions[bodyDirection];

    const directionID = computeFragmentHash(currentStoryId, directionKey);

    storyCache[directionID] = { text: req.body[bodyDirection] };

    const currentStoryFragments = buildTemplatingData(currentStoryId);
    // Also add the currentStoryId for good measure. Coudl do it in the above function but it feels better here.
    // currentStoryFragments.currentStoryId = currentStoryId;

    console.log({ body: req.body });
    console.log({ storyCache });
    console.log({ currentStoryFragments });
    console.log({ bodyDirection });

    res.render('index.njk', currentStoryFragments);
}


function buildTemplatingData(currentStoryId) {

    const currentFragment = storyCache[currentStoryId];
    const north = storyCache[`${currentStoryId}1`];
    const east = storyCache[`${currentStoryId}2`];
    const south = storyCache[`${currentStoryId}3`];
    const west = storyCache[`${currentStoryId}4`];

    const fragments = { currentStoryId, currentFragment, north, east, south, west };

    return fragments;
}


// Can easily be swapped out for something more robust later.
function computeFragmentHash(fragmentID, direction) {
    return `${fragmentID}${direction}`;
}


module.exports = {
    index,
    getFragment,
    postFragment
};