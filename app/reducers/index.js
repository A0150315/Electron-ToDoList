// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import viewbroadcast from './viewbroadcast';

const rootReducer = combineReducers({
  viewbroadcast,
  router
});

export default rootReducer;
