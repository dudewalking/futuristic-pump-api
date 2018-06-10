const bodyParser = require('body-parser'),
    compression = require('compression'),
    sessionOptions = require('./sessionOptions'),
    expressSession = require('express-session'),
    helmet = require('helmet'),
    cors = require('cors'),
    corsOptions = require('./corsOptions');

const getMiddlewares = () => [
    helmet(),
    cors(corsOptions),
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressSession(sessionOptions),
];

module.exports = { getMiddlewares };
