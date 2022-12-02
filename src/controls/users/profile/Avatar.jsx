import React from 'react';

import { Avatar } from "baseui/avatar";
export default ({ src }) => {
  return (
    <Avatar
      name="Jane Doe"
      size="scale2400"
      src={src}
    />
  );
}

// const Avatar = ({ src }) => {
// 	return <img src={src} 
// 				width="100" 
// 				height="100"
// 				style={{
// 					borderRadius: '50%', 
// 					padding: '10px'
// 					// float: 'left'
// 				}} />
// }

// export default Avatar