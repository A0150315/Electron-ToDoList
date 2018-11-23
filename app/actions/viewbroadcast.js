export const DELETE_ITEM = 'DELETE_ITEM';

export function deletement(id, key) {
  return { type: DELETE_ITEM, id, key };
}

export function deleteItem(id, key) {
  return (dispatch, getState) => {
    const { counter } = getState();
    console.log(counter);
    dispatch(deletement(id, key));
  };
}
