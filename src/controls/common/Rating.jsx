import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"

const Rating = ({ stats }) => {
  // const [css, theme] = useStyletron();
  return <p>{stats.likes} 🌱 : {stats.dislikes} 💀</p>
}
  

 export default Rating;
 