import React from 'react';
import ReactDOM from 'react-dom';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
  }
  
  componentDidMount() {
    if (this.props.opacity) this.animate();
  }
  
  animate() {
    if (!this.timerID) {
      if (this.props.opacity === 0) {
        this.props.dispatchOpacity();
      }
      
      this.timerID = setInterval(
        () => this.tick(),
        3000
      );
    }
  }
  
  tick() {
    this.props.dispatchOpacity();
    if (this.props.opacity === 0) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }
  
  render() {
    return (
      <div className="item" onClick={this.animate}>
        <span className="item__circle" style={{opacity: this.props.opacity}}></span>
      </div>
    );
  }
}
