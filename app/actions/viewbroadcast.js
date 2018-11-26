export const DELETE_ITEM = 'DELETE_ITEM';

export function deletement(key) {
  return { type: DELETE_ITEM, key };
}

export function deleteItemFromTimerByKey(key) {
  return dispatch => {
    dispatch(deletement(key));
  };
}
