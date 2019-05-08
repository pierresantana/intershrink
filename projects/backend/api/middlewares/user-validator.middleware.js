const errorHandler = require('../utils/error-handler');
const UsersModel = require('../models/users.model');

exports.hasUserValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.firstName) {
            errors.push('Missing first name field');
        }
        if (!req.body.lastName) {
            errors.push('Missing last name field');
        }
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


exports.checkUserAlreadyExists = async (req, res, next) => {
    UsersModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                return next();
            }
            return errorHandler(res, ['The provided email already has an account']);
        });
};