import React from 'react';
import css from './Spinner.less';


export default function Spinner(props) {  
  return <div>
      <div className='spinner'></div>
      <span>{props.message}</span>
    </div>
}
