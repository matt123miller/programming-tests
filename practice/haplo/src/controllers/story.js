//@ts-check
/// <reference path="../../node_modules/@types/express/index.d.ts"/>
// const express = require('express');

// /**
//  * 
//  * @param {Express.Request} req 
//  * @param {Express.Response} res 
//  */
function index(req, res) {

    res.render("index.njk");
}


module.exports = {
    index
};