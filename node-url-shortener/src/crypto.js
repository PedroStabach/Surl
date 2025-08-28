const crypto = require('crypto');

function md5Hash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

console.log(md5Hash("minhaSenha")); // ex: "5f4dcc3b5aa765d61d8327deb882cf99"
