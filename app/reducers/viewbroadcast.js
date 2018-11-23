// @flow
import { DELETE_ITEM } from '../actions/viewbroadcast';

export default function counter(state = 0, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return state + 1;
    default:
      return state;
  }
}
