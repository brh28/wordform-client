import React from 'react';
import AuthorTag from '../../common/AuthorTag.jsx'

const TitleBar = ({ title, author, publish_date }) => {
	const date = publish_date ? new Date(publish_date) : new Date()
	const options = { year: 'numeric', month: 'short', day: 'numeric' };   
	return (
		<div>
			<h1>{title}</h1>
			<table>
				<tbody>
				<tr><td><AuthorTag authorId={author} className='mb-10' /></td></tr>
				<tr><td>{date.toLocaleDateString('en-US', options)}</td></tr>
				</tbody>
			</table>
		</div>
	)
}

export default TitleBar