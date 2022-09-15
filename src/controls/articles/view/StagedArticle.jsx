import React from 'react';
import { withRouter } from "react-router";
import TitleBar from './TitleBar'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

const StagedArticle = ({ article, history, onDelete }) => {
	const { _id, title, author, purchase_date, sanitizedHtml } = article
	return (
		<div>
			<TitleBar title={title} 
					author={author} 
					publish_date={purchase_date} />
			<hr />
			<div style={{ maxWidth: '600px' }} className="" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>
			<ButtonGroup>
				<Button onClick={() => history.push(`/articles/${_id}/publish`)}>
	          		Publish
	        	</Button>
	        	<Button onClick={() => history.push(`/articles/${_id}/edit`)}>
	          		Edit
	        	</Button>
	        	<Button onClick={() => onDelete()}>
	          		Delete
	        	</Button>
	        </ButtonGroup>
		</div>
	)
}

export default withRouter(StagedArticle);