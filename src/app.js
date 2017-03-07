import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux'
import css from './app.less';
import { toogleItem } from './actions';
import item from './reducers';
import Grid from './components/grid.js';

function mapStateToProps (state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onItemClick: (row, column) => {
      dispatch(toogleItem(row, column))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

let store = createStore(item);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
