import React from 'react';
import Delete from "baseui/icon/delete";

export default ({ keys, onUpdate }) => {
	const deleteKey = (idx) => {
		const updatedKeySet = [...keys]
	    updatedKeySet.splice(idx, 1)
	    onUpdate(updatedKeySet)
	}
	return (
		<ul>
			{ keys.map((lk, i) => {
				return (
					<li key={i}>
						<div>
							{lk.slice(0,4) + '...' + lk.slice(-4)} 
							{ onUpdate ? <Delete size={24} style={{cursor: 'pointer'}} onClick={() => deleteKey(i)} /> : null }
						</div>
					</li>) 
			}) }
		</ul>
	)
} 