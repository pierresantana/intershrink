const config = require('./config/config.env');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const Routers = require('./api/routes');

app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
Routers(app);

const server = app.listen(config.port, () => {
    console.log('running server at port http://localhost:%s', config.port);
});

module.exports = server;