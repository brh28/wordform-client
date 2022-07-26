import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"

const Ratings = ({ likes, dislikes, style }) => {
  return (
  	<div style={style}>
	  	<div><ArrowUp title="Likes" size={32} viewBox={"0 -6 24 24"} />{likes}</div>
	  	<div><ArrowDown title="Dislikes" size={32} viewBox={"0 -6 24 24"} />{dislikes}</div>
  	</div>
  )
}

 export default Ratings;
 