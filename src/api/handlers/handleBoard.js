const { Board } = require('./../../todos/board');
const jsonResponses = require('./../../api/responses/jsonResponses');

const boards = {};

module.exports = Object.freeze({
  boards,
  getBoard: (req, res, queryParams) => {
    const boardName = queryParams.get('board');
    // If the board doesn't exist, make the board
    if (!boards[boardName]) boards[boardName] = new Board(boardName);
    // Send the board data back to the client
    jsonResponses.successGet(boards[boardName], {})(req, res);
  },
  getBoardMeta: (req, res) => jsonResponses.meta304(req, res),
});
