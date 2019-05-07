const config = require('../../config/config.env');
const mongoose = require('mongoose');
const hashGenerator = require('../utils/hash-generator');
mongoose.connect(config.mongo.host + '/' + config.mongo.collection, { useNewUrlParser: true });
const Schema = mongoose.Schema;
const geoip = require('geoip-lite');

const linkAccessSchema = new Schema({
    _linkId: Schema.Types.ObjectId,
    inserted: Date,
    ipAddress: String,
    
    // Schema for geoip-lite
    range: Array,
    country: String,
    region: String,
    eu: String,
    timezone: String,
    city: String,
    ll: Array,
    metro: Number,
    area: Number
});

linkAccessSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

linkAccessSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
    }
});

linkAccessSchema.findById = function (cb) {
    return this.model('links-access').find({id: this.id}, cb);
};

const LinksAccess = mongoose.model('links-access', linkAccessSchema);

exports.createLink = (linkId, ipAddress) => {
    const geoData = geoip.lookup(ipAddress)
    const accessData = {
        _linkId: linkId,
        inserted: Date.now(),
        ipAddress: ipAddress,
        ...geoData
    };

    if (!accessData.country) {
        accessData.country = 'Unknown';
    }

    const linkAccess = new LinksAccess(accessData);
    return linkAccess.save();
};

exports.list = (params) => {
    let query = LinksAccess.find(params.filter);
    if (params.limit > 0 && params.page >= 0) {
        query.limit(params.limit)
            .skip(params.limit * params.page);
    }
    if (params.sort) {
        query.sort(params.sort);
    }
    return new Promise((resolve, reject) => {
        query.exec(function (err, links) {
                if (err) {
                    reject(err);
                } else {
                    resolve(links.map(link => link.toJSON()));
                }
            })
    });
};

exports.removeById = (linkAccessId) => {
    return new Promise((resolve, reject) => {
        LinksAccess.remove({_id: linkAccessId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
