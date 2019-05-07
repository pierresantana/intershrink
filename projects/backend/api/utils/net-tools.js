const axios = require('axios');
const cheerio = require('cheerio')

exports.validateUrl = async (req) => {
    let isValid = false;

    if (!/^(\w+):\/\//.test(req.body.url)) {
        req.body.url = `http://${req.body.url}`;
    }

    await axios.get(req.body.url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            req.body.title = $('title').text();
            isValid = true;
        })
        .catch(() => isValid = false);

    return isValid;
}