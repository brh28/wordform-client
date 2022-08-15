import React, {Component} from 'react';
import { withRouter } from "react-router";
import RateContent from "./view/RateContent"
import Ratings from './Ratings'
import AuthorTag from '../common/AuthorTag.jsx'
import { Button } from "baseui/button";
import { server } from "../../api"

const TitleBar = ({ title, author, publish_date }) => {
	const date = publish_date ? new Date(publish_date) : new Date()   
	return (
		<div>
			<h1>{title}</h1>
			<table>
				<tr><AuthorTag authorId={author} className='mb-10' /></tr>
				<tr>{date.toLocaleDateString()}</tr>
			</table>
		</div>
	)
}

const Actions = (props) => {
	const { _id, isPublished, onDelete, isAuthor, viewerId } = props
	if (isAuthor && isPublished) {
		return <Button onClick={() => onDelete(_id)} 
					   overrides={{BaseButton: {style: {width: '50%', backgroundColor: 'red'}}}}>
	          		Delete
	        	</Button>
	} else if (isAuthor && !isPublished) {
		return <Button onClick={() => props.history.push(`/articles/${_id}/publish`)}>
	          		Publish
	        	</Button> 
	} else if (!viewerId) {
		return null
	} else {
		return <RateContent articleId={_id} />
	}
}

const ArticleView = (props) => {
	const { viewerId, _id, title, author, isPublished, purchase_date, ratings, price, sanitizedHtml, onDelete} = props
  	const isAuthor = viewerId === author
  	// const isFree = !price.amount || price.amount === 0 
  	return (
		  <div>
		  	<TitleBar title={title} 
		  			author={author} 
		  			publish_date={purchase_date} />
		  	<hr />
		    <div style={{ maxWidth: '600px' }}className="" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>
		    {isAuthor && isPublished ? <Ratings {...ratings} /> : null}
		    <Actions isAuthor={isAuthor} {...props} />
		  </div>
    );
}

export default withRouter(ArticleView);