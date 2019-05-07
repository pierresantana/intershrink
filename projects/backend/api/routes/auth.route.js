const VerifyUserAuthenticationMiddleware = require('../middlewares/verify.user-authentication.middleware');
const AuthController = require('../controllers/auth.controller');
const AuthValidationMiddleware = require('../middlewares/auth.validation.middleware');
exports.routesConfig = function (app) {

    app.get('/auth/info', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthController.token_info
    ]);

    app.post('/auth', [
        VerifyUserAuthenticationMiddleware.hasAuthValidFields,
        VerifyUserAuthenticationMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthController.login
    ]);
};