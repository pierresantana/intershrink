const config = require('../../config/config.env');
const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.connect(config.mongo.host + '/' + config.mongo.collection, { useNewUrlParser: true });
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    inserted: Date
});

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;   
    }
});

usersSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Users = mongoose.model('Users', usersSchema);

exports.findById = (id) => {
    return Users.findById(id)
        .then(result => result ? result.toJSON(): null);
};

exports.findByEmail = (email) => {
    return Users.find({email: email});
};

exports.createUser = (userData) => {
    userData.inserted = Date.now();
    const user = new Users(userData);
    return user.save();
};

exports.list = (params) => {
    let query = Users.find();
    if (params.limit > 0 && params.page >= 0) {
        query.limit(params.limit)
            .skip(params.limit * params.page);
    }
    return new Promise((resolve, reject) => {
        query.exec((err, users) => {
            if (err) {
                reject(err);
            } else {
                resolve(users.map(user => user.toJSON()));
            }
        })
    });
};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        Users.findById(id, (err, user) => {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser.toJSON());
            });
        });
    })

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Users.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};