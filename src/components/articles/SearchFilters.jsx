import React, { useState } from 'react';
// import {useStyletron} from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input";
import { Button, SHAPE } from "baseui/button";
import Search from 'baseui/icon/search'
import Delete from 'baseui/icon/delete'
// import { Slider } from "baseui/slider";

const SearchFilters = ({ userId, onUpdate }) => {
	const [expanded, setExpanded] = useState(false);
	const [author, setAuthor] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);

	const reset = () => {
		onUpdate(null);
		setExpanded(false);
		setAuthor(null);
		setMaxPrice(null);
	}

	if (!expanded) return <Button shape={SHAPE.pill} onClick={() => setExpanded(true)}><Search size={24}/></Button>
	return (<div style={{ display: 'inline-flex'}}> 
			<div>
				<Button shape={SHAPE.pill} onClick={reset}><Delete size={24} /></Button>
			</div>
			<div>
				<FormControl caption='Author'>
					<Input
						startEnhancer="@"
						value={author}
						onChange={evt => setAuthor(evt.target.value)}
						clearOnEscape
						overrides={{
							Root: { style: {marginLeft: '10px', paddingLeft: '4px', maxWidth: '150px'}}, 
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
		      		onClick={() => onUpdate({ partialAuthor: author, maxPrice })}
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