import { createStore, combineReducers } from 'redux';
import routerReducer from './reducers/router.reducer';

export default createStore(combineReducers({
  route: routerReducer,
}));
