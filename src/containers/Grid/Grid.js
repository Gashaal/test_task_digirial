import React from 'react';
import css from './Grid.less';
import Item from '../../components/Item';
import Spinner from '../../components/Spinner';


class Grid extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='grid'>
        {this.props.items.map((item, row) =>
          <div className='row' key={row}>
            {item.map((cell, column) =>
              <Item key={row.toString() + column} 
                opacity={cell} 
                toggleItemAnimate={() => {this.props.toggleItemAnimate(row, column)}} 
                toggleItem={() => {this.props.toggleItem(row, column)}}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Grid;
