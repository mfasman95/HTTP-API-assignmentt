const crypto = require('crypto');
const Note = require('./note');

export default class Board {
  constructor(name) {
    this.notes = {};
    this.name = name;
    this.etag = crypto.createHash('sha1').update(this.notes);
    this.digest = this.etag.digest('hex');
  }

  updateHash() {
    this.etag = crypto.createHash('sha1').update(this.notes);
    this.digest = this.etag.digest('hex');
  }

  addNote(text) {
    const note = new Note(text);
    this.notes[note.digest] = note;
    this.updateHash();
  }

  removeNote(digest) {
    if (this.notes[note.digest]) delete this.notes[note.digest];
    console.log('FAILED TO DELETE NOTE');
  }
}