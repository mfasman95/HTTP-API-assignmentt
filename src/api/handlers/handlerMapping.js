const { notFound } = require('./../responses/jsonResponses');
const { getBoard, getBoardHead } = require('./handleBoard');
const { makeToDo, makeToDoHead, toggleToDo, toggleToDoHead } = require('./handleToDo');

module.exports = Object.freeze({
  handleApiGet: (req, res, reqType, queryParams) => {
    switch (reqType) {
      case 'getBoard': { return getBoard(req, res, queryParams); }
      default: {
        if (process.env.NODE_ENV === 'development') console.log(`Unhandled reqType ${reqType} in GET handler`);
        return notFound(req, res);
      }
    }
  },
  handleApiPost: (req, res, reqType, queryParams) => {
    switch (reqType) {
      case 'makeToDo': { return makeToDo(req, res, queryParams); }
      case 'toggleToDo': { return toggleToDo(req, res, queryParams); }
      default: {
        if (process.env.NODE_ENV === 'development') console.log(`Unhandled reqType ${reqType} in POST handler`);
        return notFound(req, res);
      }
    }
  },
  handleApiHead: (req, res, reqType) => {
    switch (reqType) {
      case 'getBoard': { return getBoardHead(req, res); }
      case 'makeToDo': { return makeToDoHead(req, res); }
      case 'toggleToDo': { return toggleToDoHead(req, res); }
      default: {
        if (process.env.NODE_ENV === 'development') console.log(`Unhandled reqType ${reqType} in HEAD handler`);
        return notFound(req, res);
      }
    }
  },
});
