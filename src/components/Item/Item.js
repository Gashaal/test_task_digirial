import React from 'react';
import css from './Item.less';


export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }
  
  componentDidMount() {
    if (this.props.opacity) this.props.toggleItemAnimate();
  }
  
  animate() {
    const opacity = this.props.opacity;
    this.props.toggleItem();
    
    if (opacity === 0) {
      this.props.toggleItemAnimate();
    }
  }
  
  render() {
    let duration = this.props.opacity === 1 ? '0s' : '3s';
    
    return (
      <div className='item' onClick={this.animate}>
        <span className='item__circle' style={{opacity: this.props.opacity, transitionDuration: duration}}></span>
      </div>
    );
  }
}
