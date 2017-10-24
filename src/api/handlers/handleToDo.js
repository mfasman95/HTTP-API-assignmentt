const { ToDo } = require('./../../todos/toDo');
const { boards } = require('./handleBoard');
const jsonResponses = require('./../../api/responses/jsonResponses');

module.exports = Object.freeze({
  makeToDo: (req, res, queryParams) => {
    const boardName = queryParams.get('board');
    const toDoTitle = queryParams.get('title');
    const toDoText = queryParams.get('text');
    // If the board doesn't exist, alert the user
    if (!boards[boardName]) {
      jsonResponses.respond400({
        message: `The board ${boardName} does not exist, your To Do cannot be added`,
        id: 'boardDoesNotExist',
      })(req, res);
      return;
    }
    // Make a ToDo from the data
    const td = new ToDo(toDoTitle, toDoText);
    // Add that ToDo to the board
    boards[boardName].addToDo(td);
    // Send the ToDo data back to the client
    jsonResponses.respond201(td, {})(req, res);
  },
  toggleToDo: (req, res, queryParams) => {
    const boardName = queryParams.get('board');
    const toDoDigest = queryParams.get('digest');
    const toDoState = queryParams.get('state');

    // If the board doesn't exist, alert the user
    if (!boards[boardName]) {
      jsonResponses.respond400({
        message: `The board ${boardName} does not exist, your To Do cannot be added`,
        id: 'boardDoesNotExist',
      })(req, res);
      return;
      // If the toDo doesn't exist, alert the user
    } else if (!boards[boardName].toDos[toDoDigest]) {
      jsonResponses.respond400({
        message: `The toDo you wanted to modify, ${toDoDigest}, does not exist, your To Do cannot be modifed`,
        id: 'boardDoesNotExist',
      })(req, res);
      return;
    }

    const td = boards[boardName].toDos[toDoDigest];
    td.setComplete(toDoState);

    jsonResponses.respond204(req, res);
  },
  makeToDoMeta: (req, res) => jsonResponses.meta304(req, res),
  toggleToDoMeta: (req, res) => jsonResponses.meta304(req, res),
});
