const uuid = require('uuid/v4');

module.exports = (value) => {
  const strData = uuid(value);
  let hash = 0, i, chr;

  if (strData.length === 0) {
    return hash;
  }

  for (i = 0; i < strData.length; i++) {
    chr = strData.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  return hash.toString(36);
};
