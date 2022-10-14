import React, {Component} from 'react';
import TitleBar from './TitleBar'
import RateContent from "./RateContent"
import { server } from "../../../api"
import Spinner from "../../common/Spinner";
import { Error } from '../../common/Notifications.jsx'
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

const PublishedArticle = ({ user, article, onDelete }) => {
	const { _id, title, author, publish_date, sanitizedHtml } = article
	const [isLoading, setIsLoading] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState(null);

	if (isLoading) return <Spinner isActive />
	if (user === author)  { 
		return (
			<div>
				<Error message={errorMsg} />
				<TitleBar title={title} 
						author={author} 
						publish_date={publish_date} />
				<hr />
				<div style={{ maxWidth: '600px' }}className="" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>
				<ButtonGroup>
					<Button onClick={() => onDelete()} 
						   overrides={{BaseButton: {style: {width: '50%', backgroundColor: 'red'}}}}>
		          		Delete
		        	</Button>
		        </ButtonGroup>
			</div>
		)
	} else {
		return (
			<div>
				<TitleBar title={title} 
						author={author} 
						publish_date={publish_date} />
				<hr />
				<div style={{ maxWidth: '600px' }} className="" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>
				{ user ? <RateContent articleId={_id} /> : null }
			</div>
		)
	}
}

export default PublishedArticle