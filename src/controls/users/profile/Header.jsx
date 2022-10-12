import React, {Component, useState} from 'react';
import { Textarea } from "baseui/textarea";
import { ButtonGroup } from "baseui/button-group";
import { Button, KIND } from "baseui/button";
import { StyledLink } from "baseui/link";
import AuthorTag from '../../common/AuthorTag.jsx'
import { server } from '../../../api';
import Spinner from '../../common/Spinner';
import {Error, Success} from '../../common/Notifications'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false, // set to true when fetching
			description: null
		};
		this.fetchUser = this.fetchUser.bind(this);
		this.saveDescription = this.saveDescription.bind(this)
	}

	componentDidMount() {
		this.fetchUser()
	}

	fetchUser() {
		this.setState( { isLoading: true } )
		server.getUserProfile(this.props.userId)
			.then(res => this.setState( { isLoading: false, description: res.description } ))
	}

	saveDescription(description) {
		this.setState( { isLoading: true, error: null } )
		server.updateUserDescription(this.props.userId, description)
			.then((r) => {
				if (r.error) {
					this.setState({ isLoading: false, error: r.error })
				} else {
					this.setState({ isLoading: false, description: description })
				}
			})
			.catch(() => this.setState({ isLoading: false, error: 'Failed to update.'}))
	}

	render() {
		const { userId, editable } = this.props
		console.log(this.state)
		const { description } = this.state
		return (
			<Spinner isActive={this.state.isLoading}>
				<Error message={this.state.error} />
				<div style={{ display: 'inline-flex', padding: '10px'}}>
					<img src={'/images/satoshi.jpeg'} 
					width="100" 
					height="100"
					style={{
						borderRadius: '50%', 
						padding: '10px'
						// float: 'left'
					}} />	  		
			  		<div style={{margin: 'auto'}}>
				  		<AuthorTag authorId={userId} />
				  		<br />
				  		<Description
				  			description={description} 
				  			editable={editable}
				  			onSave={this.saveDescription} />
			  		</div>
			  	</div>
			</Spinner>
		)
	}
}

const Description = ({ description, editable, onSave }) => {
	const [editting, setEditting] = useState(false)
	const [newDescription, updateDescription] = useState(description)

	if (!editable) return (
		<div style={{marginTop: '8px', display: 'inline-flex', whiteSpace: 'pre-wrap'}} onClick={() => setEditting(true)}>
			{`${description}`}
		</div>
	)
	else if (editting) return (
		<div>
			<div style={{marginTop: '5px', marginBottom: '5px'}}>
				<Textarea 
					value={newDescription}
					onChange={e => updateDescription(e.target.value)} />
			</div>
			<div style={{float: 'right'}}>
				<Button kind={KIND.primary} onClick={() => onSave(newDescription)}>Save</Button>
				<Button kind={KIND.secondary} onClick={() => setEditting(false)}>Cancel</Button>
			</div>
		</div>
	)
	else if (description) return (
		<div style={{marginTop: '8px', display: 'inline-flex', cursor: 'pointer', whiteSpace: 'pre-wrap'}} onClick={() => setEditting(true)}>
			{`${description}`}
		</div>
	)
	else return (<div style={{marginTop: '5px'}}>
			<StyledLink style={{cursor: 'pointer'}} onClick={() => setEditting(true)}>Add description</StyledLink>
		</div>)	
}

export default Header
