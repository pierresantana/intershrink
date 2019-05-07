exports.onlySameUserCanDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    }
    return res.status(403).send();
};