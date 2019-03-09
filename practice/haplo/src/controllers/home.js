function index(reqt, res) {

    return res.json({
        text: 'Hello world'
    })
}

module.exports = {
    index
};