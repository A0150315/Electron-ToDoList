export const SETAVATAR = 'SETAVATAR';

export function setAvatar(avatarUri) {
  return { type: SETAVATAR, avatarUri };
}

// export function deleteItemFromTimerByKey(key) {
//   return dispatch => {
//     dispatch(deletement(key));
//   };
// }
