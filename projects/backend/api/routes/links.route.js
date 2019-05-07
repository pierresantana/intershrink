const LinksController = require('../controllers/links.controller');
const LinkValidatorMiddleware = require('../middlewares/link-validator.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/links', [
        ValidationMiddleware.validJWTNotRequried,
        LinkValidatorMiddleware.linkValidator,
        LinksController.insert
    ]);
    app.get('/links/top', [
        LinksController.listTopLinks
    ]);
    app.get('/links/:linkId', [
        LinksController.findAndUpdateLink
    ]);
    app.get('/links', [
        ValidationMiddleware.validJWTNeeded,
        LinksController.list
    ]);
    app.patch('/links/:linkId', [
        ValidationMiddleware.validJWTNeeded,
        LinksController.patchById
    ]);
    app.delete('/links/:linkId', [
        ValidationMiddleware.validJWTNeeded,
        LinksController.removeById
    ]);
};