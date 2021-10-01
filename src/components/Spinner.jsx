import {withStyle} from 'baseui';
import {StyledSpinnerNext} from 'baseui/spinner';

const Spinner = withStyle(StyledSpinnerNext, {
  width: '48px',
  height: '48px',
  borderLeftWidth: '12px',
  borderRightWidth: '12px',
  borderTopWidth: '12px',
  borderBottomWidth: '12px',
  borderTopColor: 'gray',
});
export default Spinner;