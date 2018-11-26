// @flow
import { DELETE_ITEM } from '../actions/viewbroadcast';

export default function viewBroadcast(state = {}, action) {
  switch (action.type) {
    case DELETE_ITEM:
      console.log({
        ...state,
        deletingKey: action.key
      });
      return {
        ...state,
        deletingKey: action.key
      };
    default:
      return state;
  }
}
