const express = require("express"),
    app = express(),
    controllerRouter = require("./controllerRoute"),
    pumpRouter = require("./pumpRoute");

module.exports = () => {
    return [
        app.use('/controller', controllerRouter),
        app.use('/pump', pumpRouter),
    ]
};
