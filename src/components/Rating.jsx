import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"

const Rating = ({ stats }) => {
    const [css, theme] = useStyletron();

  return <div>
    <label>{stats.likes}</label> 
    <span><ArrowUp size={32} /></span>
    <label>{stats.dislikes}</label> 
    <span><ArrowDown size={32} /></span>
  </div>;
}
  

 export default Rating;
 