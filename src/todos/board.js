const crypto = require('crypto');
const { ToDo } = require('./toDo');

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

  addToDo(text) {
    const toDo = new ToDo(text);
    this.toDos[toDo.digest] = toDo;
    this.updateHash();
  }

  removeNote(digest) {
    if (this.toDos[digest]) delete this.toDos[digest];
  }
}

module.exports = Object.freeze({
  Board,
});
