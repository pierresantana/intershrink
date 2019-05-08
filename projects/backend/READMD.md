## Intershrink - URL shortener (backend)

NodeJS app for interlink url shortener.

Technologies: Express, Mongoose, JWT, GeoIP-Lite

# Configuring database connection

The database connection is using to the follow settings:

```json
{
    "host": "mongodb://localhost:27017",
    "collection": "shrink"
}
```

If you would like to change, please edit the file ```config/config.env.js```.

Mongoose documentation: https://mongoosejs.com/docs/connections.html


# Start project

The backend server will be listing on 3000/tcp port

```bash
$ npm start
```

