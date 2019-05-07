const UsersModel = require('../models/users.model');
const errorHandler = require('../utils/error-handler');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return errorHandler(res, errors);
        } else {
            return next();
        }
    } else {
        return errorHandler(res, ['Missing email and password fields']);
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UsersModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].email,
                        provider: 'password',
                        name: user[0].firstName + ' ' + user[0].lastName,
                    };
                    return next();
                } else {
                    return errorHandler(res, ['Invalid e-mail or password']);
                }
            }
        });
};