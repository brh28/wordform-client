import React, {Component} from 'react';
import RateContent from "./RateContent"
import AuthorTag from '../../common/AuthorTag.jsx'
import { Button } from "baseui/button";
import { server } from "../../../api"

const ArticleView = ({ viewerId, _id, title, author, publish_date, sanitizedHtml, onDelete}) => {
 
  	const isAuthor = viewerId === author

  	return (
		  <div>
		  	<TitleBar title={title} 
		  						author={author} 
		  						publish_date={publish_date} />
		    <div className="" dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>
		    {isAuthor 
		    	? <Button onClick={() => onDelete(_id)} overrides={{BaseButton: {style: {width: '50%', backgroundColor: 'red'}}}}>
          		Delete Article
        		</Button>
		    	: <RateContent articleId={_id} /> }
		  </div>
    );
}

const TitleBar = ({ title, author, publish_date }) => {
	return (
		<div>
			<h1>{title}</h1>
			<table style={{'margin-bottom': '40px'}}>
				<tr><AuthorTag authorId={author} className='mb-10' /></tr>
				<tr>{new Date(publish_date).toLocaleDateString()}</tr>
			</table>
		</div>
	)
}

export default ArticleView;