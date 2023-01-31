import React, {Component} from 'react';
import { withRouter } from 'react-router';
import TitleBar from './TitleBar'
import RateContent from "./RateContent"
import { server } from "../../../api"
import Spinner from "../../common/Spinner";
import { Warning, Error } from '../../common/Notifications.jsx'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { StyledLink } from "baseui/link";
import FormattedContent from './FormattedContent'
import ArticleSummary from './ArticleSummary'
import Comments from '../Comments'

const PublishedArticle = ({ user, article, onEdit, onDelete, history }) => {
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
				{ !user 
					? <Warning message={(<p>You are not signed in. <StyledLink style={{cursor: 'pointer'}} onClick={() => history.push('/login', { returnUrl: history.location.pathname })}>Sign in</StyledLink> to revisit purchased content</p>)} /> 
					: null } 
				<TitleBar title={title} 
						author={author} 
						publish_date={publish_date} />
				<hr />
				<ArticleSummary articleId={_id} summary={summary} />
				<FormattedContent content={sanitizedHtml} />
				<hr />
				{ user 
					? <div>
						<RateContent articleId={_id} />
						<Comments articleId={_id} user={user} />
					</div>
					: <Error message={(<p><StyledLink style={{cursor: 'pointer'}} onClick={() => history.push('/login', { returnUrl: history.location.pathname })}>Sign in</StyledLink> to leave a rating, review, or comment</p>)} /> }
				
			</div>
		)
	}
}

export default withRouter(PublishedArticle)