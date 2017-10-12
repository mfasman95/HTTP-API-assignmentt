const { notFound } = require('./jsonResponses');
const handleUsers = require('./handleUsers');
const { getBoard, makeBoard } = require('./api/handleBoard');

module.exports = Object.freeze({
  handleApiGet: (req, res, reqType, queryParams) => {
    switch (reqType) {
      case 'getUsers': { return handleUsers.getUsers(req, res); }
      case 'getUser': { return handleUsers.getUsers(req, res, queryParams); }
      case 'getBoard': { return getBoard(req, res, queryParams); }
      default: { return notFound(req, res); }
    }
  },
  handleApiPost: (req, res, reqType, queryParams) => {
    switch (reqType) {
      case 'addUser': { return handleUsers.addUser(req, res, queryParams); }
      case 'makeBoard': { return makeBoard(req, res, queryParams); }
      default: { return notFound(req, res); }
    }
  },
});
