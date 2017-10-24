const crypto = require('crypto');

class Board {
  constructor(name) {
    this.toDos = {};
    this.name = name;
    this.updateHash();
  }

  updateHash() {
    this.etag = crypto.createHash('sha1').update(JSON.stringify(this.toDos));
    this.digest = this.etag.digest('hex');
  }

  addToDo(toDo) {
    this.toDos[toDo.digest] = toDo;
    this.updateHash();
  }

  removeToDo(digest) {
    if (this.toDos[digest]) delete this.toDos[digest];
  }
}

module.exports = Object.freeze({
  Board,
});
