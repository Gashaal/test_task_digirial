import { 
  TOGGLE_ITEM,
  ANIMATE_ITEM,
  REQUEST_LOAD,
  REQUEST_SAVE,
  REQUEST_OK,
  REQUEST_FAIL,
  RECEIVE_ITEMS
} from '../actions';

const initialState = {
  isProcessing: false,
  isLoading: false,
  isSaving: false,
  requestError: false,
  items: []
}

export default function item(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOAD:
      return Object.assign({}, state, {isProcessing: true, isLoading: true});
    case REQUEST_SAVE:
      return Object.assign({}, state, {isProcessing: true, isSaving: true});
    case REQUEST_OK:
      return Object.assign({}, state, {isProcessing: false, isSaving: false, isLoading: false, requestError: false});
    case REQUEST_FAIL:
      return Object.assign({}, state, {isProcessing: true, isSaving: false, isLoading: false, requestError: true});
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {items: action.items});
    case TOGGLE_ITEM:      
      return Object.assign({}, state, {
        items: state.items.map((item, row) => {
          if (row === action.row) {
            return item.map((cell, column) => {
              if (column === action.column) {
                return 1;
              }
              
              return cell;
            });
          }
          
          return item;
        })
      });
    case ANIMATE_ITEM:
      const opacity = state.items[action.row][action.column];
      
      return Object.assign({}, state, {
        items: state.items.map((item, row) => {
          if (row === action.row) {
            return item.map((cell, column) => {
              if (column === action.column) {
                if (opacity > 0) {
                  return opacity - 0.25;
                }
              }
              
              return cell;
            });
          }
          
          return item;
        })
      });
    default:
      return state;
  }
}
