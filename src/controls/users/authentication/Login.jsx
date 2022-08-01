import React, {Component} from 'react';
import LnAuth from '../../common/LnAuth'
import LinkingKeys from './LinkingKeys'
import { withRouter } from "react-router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Spinner from '../../common/Spinner';
import { Error } from '../../common/Notifications'
import { localStorage, server, User } from '../../../api';
import Routes from '../../../routes'

class Login extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoading: false,
	    	lnurl: undefined,
	    	error: undefined,
	    	form: {
	    		userId: '',
	    		keys: []
	    	}
	    };
	    this.handleUserIdChange = this.handleUserIdChange.bind(this)
	    this.addKey = this.addKey.bind(this);
	    this.login = this.login.bind(this);
	}

	handleUserIdChange(event) {
	  	this.setState({
	  		form: {
	  			...this.state.form,
	  			userId: event.target.value
	  		}
	  	});
	  }

	addKey(key) {
	   	const { keys } = this.state.form
	    if (!keys.map(lk => lk).includes(key)) {
	    	const updatedKeySet = [...keys]
	    	updatedKeySet.push(key)
	    	this.setState({ form: { ...this.state.form, keys: updatedKeySet }})
	    }
	}

  	login() {
  		this.setState({ isLoading: true })
	    server.login(this.state.form.userId)
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
			<Spinner isActive={this.state.isLoading}>
				<Error message={this.state.error} />
				<FormControl label="User ID">
					<Input
			          value={this.state.form.userId}
			          onChange={this.handleUserIdChange}
			          placeholder="Required"
			          clearOnEscape
			        />
			    </FormControl>
			    <FormControl label="Sign the LNURL">
					<LnAuth onSignature={this.addKey} />
				</FormControl>
				{ this.state.form.keys.length ? 
					<FormControl label="Current Signatures:">
						<LinkingKeys keys={this.state.form.keys} />
					</FormControl> : null }
				<Button color={"primary"} onClick={this.login}>
					Login
				</Button>
			</Spinner>
		)
	}
}

Login.contextType = User 

export default withRouter(Login);
