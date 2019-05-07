module.exports = {
    "port": 3100,
    "jwt_secret": "!!!interlink-secret!!!",
    "jwt_expiration_in_seconds": 3600,
    "mongo": {
        "host": "mongodb://localhost:27017",
        "collection": "shrink"
    }
};