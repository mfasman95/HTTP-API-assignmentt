const { Board } = require('./../todos/board');
const jsonResponses = require('./../jsonResponses');

const boards = {};

module.exports = Object.freeze({
  getBoard: (req, res, queryParams) => {
    const boardName = queryParams.get('board');
    if (boards[boardName]) {
      jsonResponses.successGet(boards[boardName], {})(req, res);
    } else jsonResponses.notFound(req, res);
  },
  makeBoard: (req, res, queryParams) => {
    const boardName = queryParams.get('board');

    boards[boardName] = new Board(boardName);

    jsonResponses.successGet(boards[boardName], {})(req, res);
  },
});
