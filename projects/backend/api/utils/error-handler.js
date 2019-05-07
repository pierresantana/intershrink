module.exports = (res, errors) => {
    return res.status(400).send({errors});
};