import React, { Component } from "react";
import { FormControl } from "baseui/form-control";
import { Button, KIND } from "baseui/button";
import Spinner from '../../common/Spinner'
import LinkingKeys from './LinkingKeys'
import LnAuth from '../../common/LnAuth'
import {Error, Success} from '../../common/Notifications'
import { MinKeys } from './MinKeys'
import { withRouter } from "react-router";

import { server } from '../../../api'; 

class UpdateAuthentication extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
      		isLoading: true,
      		user: {
      			min_keys: undefined,
      			linking_keys: []
      		},
      		success: null,
      		error: null
    	};
    	this.fetchUser = this.fetchUser.bind(this);
    	this.addKey = this.addKey.bind(this);
	   	this.updateKeys = this.updateKeys.bind(this);
    	this.updateMinKeys = this.updateMinKeys.bind(this)
    	this.saveForm = this.saveForm.bind(this);
	}

    componentDidMount() {
    	this.fetchUser()
  	}

	fetchUser() {
		server.getUserProfile(this.props.id)
		  .then(res => this.setState( { isLoading: false, user: res } ))
		this.setState( { isLoading: true } )
	}

	addKey(key) {
	    if (!this.state.user.linking_keys.includes(key)) {
	    	const updatedKeySet = [...this.state.user.linking_keys]
	    	updatedKeySet.push(key)
	    	this.setState({ 
		      user: {
		        ...this.state.user,
		        min_keys: this.state.user.min_keys || 1,
		        linking_keys: updatedKeySet
		      } 
		    })
	    }
	}

  	updateKeys(updatedKeySet) {
  		const {min_keys} = this.state.user
  		const updatedMinKeys = min_keys > updatedKeySet.length ? updatedKeySet.length : min_keys
	    this.setState({ 
	        user: {
	          ...this.state.user,
	          min_keys: updatedMinKeys,
	          linking_keys: updatedKeySet
	        } 
	    })
  	}

	updateMinKeys(val) {
		this.setState({
			user: {
				...this.state.user,
				min_keys: val
			}
		})
	}

	saveForm() {
		this.setState({ isLoading: true })
		server.updateAuth(this.props.id, this.state.user)
		  .then(res => {
		  	if (res.status < 400) {
		  		this.setState( { isLoading: false, success: 'Updated successfully' } )
		  	}
		  	else
		  		this.setState( { isLoading: false, error: 'Could not update' } )
		  })
	}

	render() {
		return (
			<div style={{ maxWidth:'400px'}}>
				<Spinner isActive={this.state.isLoading}>
					<Success message={this.state.success} />
					<Error message={this.state.error} />
					<FormControl label="Sign the LNURL to add keys">
						<LnAuth onSignature={(signerStr) => {
		                    this.addKey(JSON.parse(signerStr).signedBy)
		                  }} />
			        </FormControl>
					{ this.state.user.linking_keys.length ?
						<div>
						<FormControl label="Linked Keys:">
							<LinkingKeys keys={this.state.user.linking_keys} onUpdate={this.updateKeys} />
						</FormControl>
						<FormControl label='Keys required for login'>
							<MinKeys selected={this.state.user.min_keys}
				                   max={this.state.user.linking_keys.length} 
				                   onChange={(val) => this.updateMinKeys(val)}/>
				        </FormControl></div> : null }
			        <Button color={"primary"} onClick={this.saveForm}>
						Save
					</Button>
				</Spinner>
			</div>
		)
	}
}

export default UpdateAuthentication;