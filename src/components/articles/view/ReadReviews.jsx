import React from 'react';
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import AuthorTag from '../../common/AuthorTag'
const options = { year: 'numeric', month: 'short', day: 'numeric' };   

const ReadReviews = ({reviews}) => {
	if (!reviews) return null
	else return (
		<TableBuilder
		  overrides={{Root: {style: {marginTop: '20px', marginBottom: '20px', whiteSpace: 'pre-wrap'}}}}
		  data={reviews}
		>
			<TableBuilderColumn 
				header='Reviews'
			  	overrides={{TableHeadCell: {style: {width: '15%'}}}}>
		        {r => new Date(r.timestamp).toLocaleDateString('en-US', options)}
		    </TableBuilderColumn>
			<TableBuilderColumn 
				overrides={{TableHeadCell: {style: {width: '15%'}}}}
				>
				{r => (
				  <AuthorTag authorId={r.user_id} />
				)}
			</TableBuilderColumn>
			<TableBuilderColumn>
				{r => r.value}
			</TableBuilderColumn>
	    </TableBuilder>
	)
}

export default ReadReviews