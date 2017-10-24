import extend from 'extend';

// Set initial application state
const initialState = {};

// Handle actions dispatched to the reducer
const actionHandlers = {
  ENTER_BOARD: (returnState, action) => {
    const rs = returnState;

    // Set the new page value
    rs.board = action.board;

    return rs;
  },
  LEAVE_BOARD: (returnState) => {
    const rs = returnState;

    // Set the new page value
    delete rs.board;

    return rs;
  },
  UPDATE_TODO: (returnState, action) => {
    const rs = returnState;

    // Add the received toDo to the board
    rs.board.toDos[action.toDo.digest] = action.toDo;

    return rs;
  },
};

// Define my action creators
export const enterBoard = board => ({ type: 'ENTER_BOARD', board });
export const leaveBoard = () => ({ type: 'LEAVE_BOARD' });
export const updateToDo = toDo => ({ type: 'UPDATE_TODO', toDo });

// Export the reducer
export default (state = initialState, action) => {
  // Make an object for the return state
  const rs = extend(true, {}, state);

  // Handle unknown action types
  if (!actionHandlers[action.type]) return rs;

  // Handle the action dispatched to the reducer, return the updated state
  return actionHandlers[action.type](rs, action, state);
};
