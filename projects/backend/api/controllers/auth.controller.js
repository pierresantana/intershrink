const config = require('../../config/config.env');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Users = require('../models/users.model');

exports.token_info = (req, res) => {
    try {
        res.status(201).send(req.jwt);
    } catch (err) {
        res.status(500).send({errors: err});
    }
}

exports.login = async (req, res) => {
    try {
        let refreshId = req.body.userId + config.jwt_secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, config.jwt_secret, {
            expiresIn: config.jwt_expiration_in_seconds
        });
        let b = new Buffer(hash);
        let refresh_token = b.toString('base64');

        const user = await Users.findById(req.body.userId);

        res.status(201).send({ ...user, accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err.message});
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, config.jwt_secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
