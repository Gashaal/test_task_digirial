import React from 'react';
import { Component } from 'react';
import Grid from '../Grid';
import Spinner from '../../components/Spinner';
import { connect } from 'react-redux';
import { fetchItems, postItems, toggleItemAnimate, toggleItem } from '../../actions';
import css from './App.less';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }
  
  componentDidMount() {
    this.props.load();
  }
  
  save() {
    this.props.save();
  }
  
  load() {
    this.props.load();
  }
  
  render() {
    const {isProcessing, isLoading, isSaving, requestError, items, toggleItemAnimate, toggleItem} = this.props;
    
    return (
      <div className='root'>
        {isProcessing &&
          <div>
          {isLoading &&
            <Spinner message='Загрузка'/>
          }
          
          {isSaving &&
            <Spinner message='Сохранение'/>
          }
        </div>
        }
        
        {requestError && <span>Произошла ошибка</span>}
        
        {!isProcessing && items.length > 0 &&
          <div>
          <Grid items={ items } toggleItemAnimate={ toggleItemAnimate } toggleItem={ toggleItem }/>
            <div className='controls'>
              <button style={{marginRight: '2px'}} onClick={this.save}>Сохранить</button>
              <button onClick={this.load}>Загрузить</button>
            </div>
          </div>
        }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isProcessing: state.isProcessing,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    requestError: state.requestError,
    items: state.items
  }
}


function mapDispatchToProps (dispatch) {
  return {
    toggleItemAnimate: (row, column) => {
      dispatch(toggleItemAnimate(row, column))
    },
    toggleItem: (row, column) => {
      dispatch(toggleItem(row, column));
    },
    load: () => {
      dispatch(fetchItems());
    },
    save: () => {
      dispatch(postItems());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
