import React, {Component, useState, useEffect} from 'react';
import FormattedContent from './FormattedContent'
import { Button, KIND } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control"
import { StyledLink } from "baseui/link";


// TODO: Refactor. Profile description. Add Review. Add comment
export const validateCharacterLength = (str, maxLength) => {
  let errorMsg
  if (str.length > maxLength) errorMsg = `-${str.length - maxLength}`
  return errorMsg
}

const TextUpload = ({ value, isEditting, error, onChange, onEdit, onSave, onCancel, children }) => { // onEdit
	if (isEditting) return (<FormControl 
          error={isEditting && error}> 
          	<div>
				<div style={{marginTop: '5px', marginBottom: '5px'}}>
					<Textarea 
			            value={value}
			            error={error}
			            onChange={e => onChange(e.target.value)} />
				</div>
				<div style={{float: 'right'}}>
					<Button kind={KIND.primary} onClick={onSave}>Save</Button>
					<Button kind={KIND.secondary} onClick={onCancel}>Cancel</Button>
				</div>
			</div>  
	</FormControl>)
	else if (!value) return <StyledLink style={{cursor: 'pointer'}} onClick={onEdit}>Add a review</StyledLink>
	return ( // value && !isEditting
			<FormControl>
	        	<div style={{marginLeft: '5px', cursor: 'pointer'}} onClick={onEdit}>
					<FormattedContent style={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }} content={value} />
				</div>
			</FormControl>
		)
}

export default TextUpload