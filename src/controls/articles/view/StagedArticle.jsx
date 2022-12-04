import React from 'react';
import { withRouter } from "react-router";
import TitleBar from './TitleBar'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import FormattedContent from './FormattedContent'
import ArticleSummary from './ArticleSummary'

const StagedArticle = ({ article, history, onEdit, onDelete }) => {
	const articleId = article._id
	return (
		<div>
			<TitleBar {...article} />
			<hr />
			<ArticleSummary articleId={articleId} summary={article.summary} />
			<FormattedContent content={article.sanitizedHtml} />
			<ButtonGroup>
				<Button onClick={() => history.push(`/articles/${articleId}/publish`)}>
	          		Publish
	        	</Button>
	        	<Button onClick={() => history.push(`/articles/${articleId}/edit`)}>
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