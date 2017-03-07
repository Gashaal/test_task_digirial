import React, { PropTypes } from 'react';
import Item from './item';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        {this.props.items.map((item, row) => 
          <div className="row" key={row}>
            {item.map((cell, column) =>
              <Item key={row.toString() + column} opacity={cell} dispatchOpacity={() => {this.props.onItemClick(row, column)}}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Grid;
