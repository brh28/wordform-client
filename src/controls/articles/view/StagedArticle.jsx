import React from 'react';
import { withRouter } from "react-router";
import TitleBar from './TitleBar'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import FormattedContent from './FormattedContent'
import ArticleSummary from './ArticleSummary'

const StagedArticle = ({ article, history, onEdit, onDelete }) => {
	const { _id, title, author, publish_date, summary, sanitizedHtml } = article
	return (
		<div>
			<TitleBar title={title} 
					author={author} 
					publish_date={publish_date} />
			<hr />
			<ArticleSummary articleId={_id} summary={summary} onEdit={onEdit} />
			<FormattedContent content={sanitizedHtml} />
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