const { Board } = require('./../todos/board');
const jsonResponses = require('./../jsonResponses');

const boards = {};

module.exports = Object.freeze({
  getBoard: (req, res, queryParams) => {
    const boardName = queryParams.get('board');
    // If the board doesn't exist, make the board
    if (!boards[boardName]) boards[boardName] = new Board(boardName);
    // Send the board data back to the client
    jsonResponses.successGet(boards[boardName], {})(req, res);
  },
});
