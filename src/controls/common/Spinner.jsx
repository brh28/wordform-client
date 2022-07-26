import React from "react";
import {withStyle} from 'baseui';
import {StyledSpinnerNext} from 'baseui/spinner';

export const SIZE = {
  small: '24px',
  medium: '48px'
};

// const BaseUiSpinner = ({size}) => {

//   return withStyle(StyledSpinnerNext, {
//     width: size || SIZE.medium,
//     height: size || SIZE.medium,
//     borderLeftWidth: '12px',
//     borderRightWidth: '12px',
//     borderTopWidth: '12px',
//     borderBottomWidth: '12px',
//     borderTopColor: 'gray',
//   });
// }

const BaseUiSpinner = withStyle(StyledSpinnerNext, {
  width: '24px',
  height: '24px',
  borderLeftWidth: '12px',
  borderRightWidth: '12px',
  borderTopWidth: '12px',
  borderBottomWidth: '12px',
  borderTopColor: 'gray',
});

export default ({ isActive, size, children }) => {
	if (isActive)
		return <BaseUiSpinner />
	else 
		return <div>{children}</div>
}