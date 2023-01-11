import React, {Component} from 'react';
import TitleBar from './TitleBar'
import RateContent from "./RateContent"
import { server } from "../../../api"
import Spinner from "../../common/Spinner";
import { Error } from '../../common/Notifications.jsx'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import FormattedContent from './FormattedContent'
import ArticleSummary from './ArticleSummary'
import Comments from '../Comments'

const PublishedArticle = ({ user, article, onEdit, onDelete }) => {
	const { _id, title, author, publish_date, sanitizedHtml, summary } = article
	const [isLoading, setIsLoading] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState(null);
	
	if (isLoading) return <Spinner isActive />
	if (user === author)  { 
		return (
			<div style={{ margin: '4px'}}>
				<Error message={errorMsg} />
				<TitleBar title={title} 
						author={author} 
						publish_date={publish_date} />
				<hr />
				<ArticleSummary articleId={_id} summary={summary} onEdit={onEdit} />
				<FormattedContent content={sanitizedHtml} />
				<ButtonGroup>
					<Button onClick={() => onDelete()} 
						   overrides={{BaseButton: {style: {width: '50%', backgroundColor: 'red'}}}}>
		          		Delete
		        	</Button>
		        </ButtonGroup>
		        <Comments articleId={_id} user={user} />
			</div>
		)
	} else {
		return (
			<div style={{ margin: '4px'}}>
				<TitleBar title={title} 
						author={author} 
						publish_date={publish_date} />
				<hr />
				<ArticleSummary articleId={_id} summary={summary} />
				<FormattedContent content={sanitizedHtml} />
				<hr />
				{ user ? <RateContent articleId={_id} /> : null }
				<Comments articleId={_id} user={user} />
			</div>
		)
	}
}

export default PublishedArticle