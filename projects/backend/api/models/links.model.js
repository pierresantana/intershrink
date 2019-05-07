const config = require('../../config/config.env');
const mongoose = require('mongoose');
const hashGenerator = require('../utils/hash-generator');
mongoose.connect(config.mongo.host + '/' + config.mongo.collection, { useNewUrlParser: true });
const Schema = mongoose.Schema;
const LinksAccess = require('./linksAccess.model');

const linkSchema = new Schema({
    _userId: Schema.Types.ObjectId,
    url: String,
    link: String,
    title: String,
    inserted: Date,
    clicks: Number
});

linkSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

linkSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
    }
});

linkSchema.findById = function (cb) {
    return this.model('links').find({id: this.id}, cb);
};

const Links = mongoose.model('links', linkSchema);

exports.findAndUpdateLink = (link, ipAddress) => {
    const data = Links.findOneAndUpdate({'link': link}, { $inc: { 'clicks': 1 }});
    
    LinksAccess.createLink(data._id, ipAddress);
    
    return data;
};

exports.createLink = (req) => {
    const linkData = { ...req.body };
    linkData.link = hashGenerator(linkData.url);
    linkData.inserted = Date.now();
    if (req.jwt) {
        linkData._userId = req.jwt.userId;
    }
    const link = new Links(linkData);
    return link.save();
};

exports.list = (params) => {
    let query = Links.find(params.filter);
    let limit = 10;
    let page = 0;
    if (params.limit > 0 && params.page >= 0) {
        limit = params.limit;
        page = params.limit * params.page;
    }
    query.limit(limit)
        .skip(page)
        .sort('-clicks');
    return new Promise((resolve, reject) => {
        query.exec(function (err, links) {
                if (err) {
                    reject(err);
                } else {
                    Links.find(params.filter).count(function(errCount, total) {
                        if (errCount) {
                            reject(errCount);
                        } else {
                            resolve({
                                content: links.map(link => link.toJSON()),
                                limit,
                                page,
                                total
                            });
                        }
                    });
                }
            })
    });
};

exports.removeById = (linkId) => {
    return new Promise((resolve, reject) => {
        Links.remove({_id: linkId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
