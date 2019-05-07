const AuthRoute = require('./auth.route');
const LinksRouter = require('./links.route');
const UsersRoute = require('./users.route');

module.exports = (app) => {
    AuthRoute.routesConfig(app);
    LinksRouter.routesConfig(app);
    UsersRoute.routesConfig(app);
}