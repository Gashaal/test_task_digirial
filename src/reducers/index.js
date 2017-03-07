import { TOOGLE_ITEM } from '../actions';

const initialState = {
  items: [
    [0,0,0,0.5],
    [0,0,0.25,0],
    [0,0,0,0],
    [0,0,1,0]
  ]
}

export default function item(state = initialState, action) {
  switch (action.type) {
    case TOOGLE_ITEM:
      const opacity = state.items[action.row][action.column];
      
      return Object.assign({}, state, {
        items: state.items.map((item, row) => {
          if (row === action.row) {
            return item.map((cell, column) => {
              if (column === action.column) {
                if (opacity > 0) {
                  return opacity - 0.25;
                } else {
                  return 1;
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
