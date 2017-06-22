import fetch from 'isomorphic-fetch';

export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export function toggleItem(row, column) {
  return {type: TOGGLE_ITEM, row, column}
}

export const ANIMATE_ITEM = 'ANIMATE_ITEM';
export function animateItem(row, column) {
  return {type: ANIMATE_ITEM, row, column}
}

export const REQUEST_SAVE = 'REQUEST_SAVE';
export function requestSave() {
  return {
    type: REQUEST_SAVE
  }
}

export const REQUEST_LOAD = 'REQUEST_LOAD';
export function requestLoad() {
  return {
    type: REQUEST_LOAD
  }
}

export const REQUEST_OK = 'REQUEST_OK';
export function requestOk() {
  return {
    type: REQUEST_OK
  }
}

export const REQUEST_FAIL = 'REQUEST_FAIL';
export function requestFail() {
  return {
    type: REQUEST_FAIL
  }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    items
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(requestLoad());
    return fetch('/data')
    .then(response => response.json())
    .then(json => setTimeout(() => {
      dispatch(receiveItems(json));
      dispatch(requestOk())
    }, 1000))
    .catch(error => dispatch(requestFail()))
  }
}

export function postItems() {
  return (dispatch, getState) => {
    dispatch(requestSave());
     return fetch('/data', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      }, 
      body: `data=${JSON.stringify(getState().items)}`})
        .then(json => setTimeout(() => {
          dispatch(requestOk());
        }, 1000))
        .catch(error => dispatch(requestFail()))
  }
}

export function toggleItemAnimate(row, column) {
  return (dispatch, getState) => {
    let timerId = setInterval(() => tick(), 3000);

    function tick() {
      dispatch(animateItem(row, column));
      if (getState().items[row][column] === 0) {
        clearInterval(timerId);
        timerId = null;
      }
    }
  }
}
