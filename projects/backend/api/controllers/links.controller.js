const LinksModel = require('../models/links.model');
const _ = require('lodash');

exports.list = (req, res) => {
    let limit = null;
    let page = null;
    let filter = {};
    if (_.isObject(req.query)) {
        if (req.query.limit > 0 && req.query.limit <= 100) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page >= 0) {
            page = parseInt(req.query.page);
        }
        if (_.isString(req.query.tag)) {
            filter.tags = new RegExp(`^${req.query.tag}$`, 'i');
        }
    }
    
    let params = {
        filter: filter,
        page: page,
        limit: limit
    };
    
    LinksModel.list(params)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.listTopLinks = (req, res) => {
    let params = {
        page: 0,
        limit: 5
    };
    
    LinksModel.list(params)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.findAndUpdateLink = (req, res) => {
    LinksModel.findAndUpdateLink(req.params.linkId, req.connection.remoteAddress)
        .then((result) => {
            if (result) {
                res.status(200).send({url : result.url});
            } else {
                res.status(404).send();
            }
        });
};

exports.insert = (req, res) => {
    LinksModel.createLink(req)
        .then((result) => {
            res.status(201).send({
                url: result.url,
                link: result.link
            });
        });
};

exports.patchById = (req, res) => {
    LinksModel.patchLink(req.params.linkId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    LinksModel.removeById(req.params.linkId)
        .then((result)=>{
            res.status(204).send({});
        });
};