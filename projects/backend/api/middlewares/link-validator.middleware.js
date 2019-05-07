const errorHandler = require('../utils/error-handler');
const netTools = require('../utils/net-tools');

exports.linkValidator = async (req, res, next) => {
    if (req.body && req.body.url) {
        const isValid = await netTools.validateUrl(req);

        if (!isValid) {
            return errorHandler(res, ['The provided URL is unreachable']);
        }

        return next();
    } else {
        return errorHandler(res, 'Missing url field');
    }
};