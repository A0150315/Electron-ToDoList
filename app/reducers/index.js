import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import viewbroadcast from './viewbroadcast';
import wechat from './wechat';

const rootReducer = combineReducers({
  viewbroadcast,
  wechat,
  router
});

export default rootReducer;
