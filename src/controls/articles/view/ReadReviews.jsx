import React from 'react';
import { Table, SIZE, DIVIDER } from "baseui/table-semantic";

const options = { year: 'numeric', month: 'short', day: 'numeric' };   

const ReadReviews = ({reviews}) => {
	if (!reviews) return null
	else return (
		<div style={{marginTop: '20px', marginBottom: '20px'}}>
			<Table
				columns={["User", 
					"Date", 
					"Review" 
					]}
				data={reviews.map((r, idx) => [
						r.user_id,
						new Date(r.timestamp).toLocaleDateString('en-US', options),
						r.value 
					]) 
				}
				size={SIZE.compact}
	      		divider={DIVIDER.grid} />
      	</div>
	)
}

export default ReadReviews