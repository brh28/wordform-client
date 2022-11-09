import * as React from "react";
import {
  Checkbox,
  STYLE_TYPE,
  LABEL_PLACEMENT
} from "baseui/checkbox";

export default ({ label, checked, disabled, onSwitch }) => {
  return (
    <Checkbox
      checked={checked}
      checkmarkType={STYLE_TYPE.toggle_round}
      onChange={e => onSwitch(e.target.checked)}
      labelPlacement={LABEL_PLACEMENT.right}
      disabled={disabled}
    >
      {label}
    </Checkbox>
  );

 }