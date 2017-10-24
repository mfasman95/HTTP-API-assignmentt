const crypto = require('crypto');

class ToDo {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.completed = false;
    this.etag = crypto.createHash('sha1').update(`${this.title}${this.text}`);
    this.digest = this.etag.digest('hex');
  }

  updateHash() {
    this.etag = crypto.createHash('sha1').update(this.text);
    this.digest = this.etag.digest('hex');
  }

  setComplete(state) {
    if (state === 'true') this.completed = true;
    else this.completed = false;
  }
}

module.exports = Object.freeze({
  ToDo,
});
