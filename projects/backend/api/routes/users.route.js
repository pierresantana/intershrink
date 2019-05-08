const UsersController = require('../controllers/users.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const UserValidatorMiddleware = require('../middlewares/user-validator.middleware');

exports.routesConfig = function (app) {
    app.post('/users', [
        UserValidatorMiddleware.hasUserValidFields,
        UserValidatorMiddleware.checkUserAlreadyExists,
        UsersController.insert
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserCanDoThisAction,
        UsersController.removeById
    ]);
};