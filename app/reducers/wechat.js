import { SETAVATAR } from '../actions/wechat';

export default function viewBroadcast(state = { avatar: '' }, action) {
  switch (action.type) {
    case SETAVATAR:
      console.log({ ...state, avatar: action.avatarUri });
      return { ...state, avatar: action.avatarUri };
    default:
      return state;
  }
}
