import crypto from 'crypto';
import extend from 'extend';

// Set initial application state
const initialState = {};


class ToDo {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.etag = crypto.createHash('sha1').update(this.text);
    this.digest = this.etag.digest('hex');
  }

  updateHash() {
    this.etag = crypto.createHash('sha1').update(this.text);
    this.digest = this.etag.digest('hex');
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

// Handle actions dispatched to the reducer
const actionHandlers = {
  ENTER_BOARD: (returnState, action) => {
    const rs = returnState;

    // Set the new page value
    rs.board = action.board;

    const td1 = new ToDo('example 1');
    const td2 = new ToDo('example 2');
    const td3 = new ToDo('example 3');

    rs.board.toDos[td1.digest] = td1;
    rs.board.toDos[td2.digest] = td2;
    rs.board.toDos[td3.digest] = td3;

    return rs;
  },
  LEAVE_BOARD: (returnState) => {
    const rs = returnState;

    // Set the new page value
    delete rs.board;
    return rs;
  },
};

export const enterBoard = board => ({ type: 'ENTER_BOARD', board });
export const leaveBoard = () => ({ type: 'LEAVE_BOARD' });

// Export the reducer
export default (state = initialState, action) => {
  // Make an object for the return state
  const rs = extend(true, {}, state);

  // Handle unknown action types
  if (!actionHandlers[action.type]) return rs;

  // Handle the action dispatched to the reducer, return the updated state
  return actionHandlers[action.type](rs, action, state);
};
