const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();

// Had to add __dirname which seems stupid
nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.set("port", 3000);

module.exports = {
    app
};