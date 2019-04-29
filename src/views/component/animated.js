import React from 'react';

export default function Animated (props) {
  const {
    total, 
    // row, 
    count, 
    loading, 
    animation,
    text,
    small
  } = props;

  let display = [];
  if(loading) {
    for (let i = 0; i < total; i++) {
      display.push (
        <div key={i}>
          {animation}
        </div>
      )
    }
  } else {
    if (count === 0){
      if(small) {
        return(<h4 className="visible-view error-small-center">{text}</h4>)
      } else {
        return(<h4 className="visible-view">{text}</h4>)
      }
    } else {
      return(props.children)
    }
  }

  return display;
}

