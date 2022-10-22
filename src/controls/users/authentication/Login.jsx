import React, {Component} from 'react';
import LnAuth from '../../common/LnAuth'
import LinkingKeys from './LinkingKeys'
import { withRouter } from "react-router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SHAPE, KIND } from "baseui/button";
import Spinner from '../../common/Spinner';
import { Error } from '../../common/Notifications'
import { localStorage, server, User } from '../../../api';
import Routes from '../../../routes'

import { StyledLink } from "baseui/link";

class Login extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoading: false,
	    	lnurl: undefined,
	    	error: undefined,
	    	form: {
	    		linking_keys: [],
	    		associatedUsers: [],
	    	}
	    };

	    this.addSigner = this.addSigner.bind(this);
	    this.login = this.login.bind(this);
	}

	addSigner(updatedSignersStr) {
		const signers = JSON.parse(updatedSignersStr)
		this.setState({ form: { ...this.state.form, linking_keys: signers.linking_keys, associatedUsers: signers.associatedUsers }, createUser: !signers.associatedUsers.length})
	}

  	login(userId) {
  		this.setState({ isLoading: true })
	    server.login(userId)
		    .then(resp => {
		    	if (resp.status === 200) {
		    		resp.json().then(r => {
		    			const [_, setUserId] = this.context
		    			setUserId(r.userId)
    					this.props.history.push(Routes.root)
		    		})
		    	} else {
		    		this.setState({ isLoading: false, error: 'Login attempt failed' })
		    	}
		    })
	  		.catch(err => console.log(err))
  	}

  	render() {
		return (
			<div style={{ maxWidth:'400px'}}>
				<Spinner isActive={this.state.isLoading}>
					<Error message={this.state.error} />
					<FormControl label='Sign the Lnurl:'>
						<LnAuth onSignature={this.addSigner} />
					</FormControl>
					{(this.state.form.linking_keys.length > 0) && !this.state.form.associatedUsers.length
						? <FormControl label="Linked Keys:">
				        	<LinkingKeys keys={this.state.form.linking_keys} onUpdate={this.updateKeys} />
				    	</FormControl>
				    	: null
					}
					{this.state.form.associatedUsers.length > 0 ? 
					    <FormControl label="Sign in as:">
					    	<div>
					    		{this.state.form.associatedUsers.map((user, uIdx) => {
						    		return (
										<Button 
											kind={KIND.secondary}
											shape={SHAPE.pill}
											disabled={!user.authorized}
											onClick={() => this.login(user._id)}>
											{user._id}
										</Button> 
									)
						    	})}
							</div>
						</FormControl>
						: <span>New to WordForm? <StyledLink style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/users/new')}>Create a user</StyledLink></span>

					}
				</Spinner>
			</div>
		)
	}
}

Login.contextType = User 

export default withRouter(Login);
