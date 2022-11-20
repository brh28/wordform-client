import React, { useState } from 'react';
// import {useStyletron} from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input";
import { Button } from "baseui/button";
// import { Slider } from "baseui/slider";

const SearchFilters = ({ userId, onUpdate }) => {
	const [author, setAuthor] = useState(null);
	const [maxPrice, setMaxPrice] = useState(10000);
	return (<div style={{ display: 'inline-flex'}}> 
			<div>
				<FormControl caption='Author'>
					<Input
						startEnhancer="@"
						value={author}
						onChange={evt => setAuthor(evt.target.value)}
						clearOnEscape
						overrides={{
							Root: { style: {paddingLeft: '4px', maxWidth: '150px'}}, 
							StartEnhancer: { style: { paddingLeft: '2px', paddingRight: '2px'}},
							Input: { style: { paddingLeft: '4px'}},
						}}
			      	/>
		      	</FormControl>
	      	</div>
	      	<div style={{ marginLeft: '10px', paddingLeft: '4px', maxWidth: '150px'}}>
		      	<FormControl caption='Max Price'>
					<Input
						endEnhancer="sats"
						value={maxPrice}
						onChange={evt => setMaxPrice(evt.target.value)}
						clearOnEscape
						type="number"
						overrides={{
							// Root: { style: { marginLeft: '10px', paddingLeft: '4px', maxWidth: '150px'}}, 
							StartEnhancer: { style: { paddingLeft: '2px', paddingRight: '2px'}},
							Input: { style: { paddingLeft: '4px'}},
						}}
			      	/>
		      	</FormControl>
	      	</div>
	      	<div>
		      	<Button 
		      		onClick={() => onUpdate({ author, maxPrice })}
		      		overrides={{
						Root: { style: { marginLeft: '10px' }}, 
					}}>
					Search
				</Button>
			</div>
	</div>)

	// return (
	// 	<TableBuilder
	// 	  overrides={{Root: {style: {marginTop: '20px', marginBottom: '20px', whiteSpace: 'pre-wrap'}}}}
	// 	  data={reviews}
	// 	>
	// 		<TableBuilderColumn 
	// 			header='Search Filters'
	// 		  	overrides={{TableHeadCell: {style: {width: '15%'}}}}>
	// 	        {r => new Date(r.timestamp).toLocaleDateString('en-US', options)}
	// 	    </TableBuilderColumn>
	// 		<TableBuilderColumn 
	// 			overrides={{TableHeadCell: {style: {width: '15%'}}}}
	// 			>
	// 			{r => (
	// 			  <AuthorTag authorId={r.user_id} />
	// 			)}
	// 		</TableBuilderColumn>
	// 		<TableBuilderColumn>
	// 			{r => r.value}
	// 		</TableBuilderColumn>
	//     </TableBuilder>
	// )
}

export default SearchFilters;