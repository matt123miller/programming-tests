//@ts-check

// This will store all the users entered story fragments for the session.
// It's prepopulated with the initial story prompt and 4 example keys.
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
    
    res.render("index.njk", currentStoryFragments);
}

function getFragment(req, res) {

    const fragmentID = req.params.fragmentID || 0;

    const currentStoryFragments = buildTemplatingData(fragmentID);

    res.render("index.njk", currentStoryFragments);
}

function postFragment(req, res) {

    // potentially use a filter and loop the directions object?
    // Don't like relying on an index position
    const bodyDirection = Object.keys(req.body)[0]; 
    const currentStoryId = req.body.currentStoryId;
    const directionKey = directions[bodyDirection];

    const fragmentHash = computeFragmentHash(currentStoryId, directionKey);

    // Fill the cache with the entered text.
    storyCache[fragmentHash] = { text: req.body[bodyDirection] };

    const currentStoryFragments = buildTemplatingData(currentStoryId);

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