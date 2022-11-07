import React, {useState} from 'react';
import FormattedContent from './FormattedContent'
import { Button, KIND } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control"
import Spinner from '../../common/Spinner';
import { server } from "../../../api"
import { StyledLink } from "baseui/link";

// redundant: create.jsx
const validateCharacterLength = (str, maxLength) => {
  let errorMsg
  if (str.length > maxLength) errorMsg = `-${str.length - maxLength}`
  return errorMsg
}

const ArticleSummary = ({ articleId, summary, onEdit }) => {
	const [isEditting, setEditting] = useState(false);
	const [newSummary, updateSummary] = useState(summary);
	const [error, updateError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const onChange = (val) => {
		updateSummary(val);
		updateError(validateCharacterLength(val, 1000));
	}
	const saveSummary = () => {
		setIsLoading(true)
		server
			.saveSummary(articleId, newSummary)
			.then(() => {
				setIsLoading(false);
				setEditting(false);
				onEdit();
			})
	}
	if (isEditting) return (<FormControl 
          label='Summary'
          error={isEditting && error}> 
          	<div>
				<div style={{marginTop: '5px', marginBottom: '5px'}}>
					<Textarea 
			            value={newSummary}
			            error={error}
			            onChange={e => onChange(e.target.value)} />
				</div>
				<div style={{float: 'right'}}>
					<Button kind={KIND.primary} onClick={saveSummary}>Save</Button>
					<Button kind={KIND.secondary} onClick={() => setEditting(false)}>Cancel</Button>
				</div>
			</div>  
	</FormControl>)
	if (!summary && !onEdit) return null
	if (!summary && onEdit) return <StyledLink style={{cursor: 'pointer'}} onClick={()=>setEditting(true)}>Add Summary</StyledLink>
	return (
		<Spinner isActive={isLoading}>
	        { onEdit 
	        	? <div style={{cursor: 'pointer'}} onClick={()=>setEditting(true)}>
					<FormattedContent style={{ fontStyle: 'italic' }} content={summary} />
				</div>
				: <div>
					<FormattedContent style={{ fontStyle: 'italic' }} content={summary} />
				</div>
	         }
        </Spinner>
		)
}

export default ArticleSummary