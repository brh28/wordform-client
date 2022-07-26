import React from 'react';
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";


export const MinKeys = ({ selected, max, onChange }) => {
  return (
    <ButtonGroup>
      {[...Array(max).keys()]
        .map(i => i+1)
        .map(i => {
          const itemProps = {}
          if (i <= selected)
            itemProps.backgroundColor = 'mono500'
          return <Button key={i} isSelected={i <= selected} onClick={() => onChange(i)}>{i}</Button>
      })}
    </ButtonGroup>
  )
}
