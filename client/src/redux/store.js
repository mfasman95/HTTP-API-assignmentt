import { createStore, combineReducers } from 'redux';
import routerReducer from './reducers/router.reducer';
import boardReducer from './reducers/board.reducer';

export default createStore(combineReducers({
  route: routerReducer,
  board: boardReducer,
}));
