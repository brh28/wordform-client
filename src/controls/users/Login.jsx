import React, {Component} from 'react';
import LnAuth from '../common/LnAuth'
import { withRouter } from "react-router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Spinner from '../common/Spinner';
import { users } from '../../data/api';

class UserLogin extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoading: true,
	    	lnurl: undefined,
	    	error: undefined,
	    	form: {
	    		userId: '',
	    		keys: []
	    	}
	    };
	   	this.eventSource = new EventSource("/api/users/authentication");
	    this.handleUserIdChange = this.handleUserIdChange.bind(this)
	   	this.addKey = this.addKey.bind(this);
	    this.login = this.login.bind(this);
	    this.removeKey = this.removeKey.bind(this);
	}

	componentDidMount() {
		this.eventSource.addEventListener("newLnurl", e => {
	      	const { lnurl } = JSON.parse(e.data)
	      	this.setState({ lnurl: lnurl, isLoading: false });
		})

		this.eventSource.addEventListener("keySign", e => {
			// this.props.onKeySign(e.data)
			this.addKey(e.data)
		})

		// this.eventSource.addEventListener("loggedIn", e => {
		// 	this.props.onLogin(e.data)
		// });
  	}

  	componentWillUnmount() {
  		this.eventSource.close();
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
	    const keys = [...this.state.form.keys]
	    if (!keys.includes(key)) keys.push(key)
	    this.setState({ 
	      form: {
	        ...this.state.form,
	        keys: keys 
	      } 
	    })
	}

  	login() {
  		this.setState({ isLoading: true })
	    users.login(this.state.form.userId)
		    .then(resp => {
		    	if (resp.status === 200) {
		    		resp.json().then(r => {
		    			localStorage.setItem( 'userId', r.userId );
				  		this.props.history.push(this.props.history.location.state.returnUrl)
		    		})
		    	} else {
		    		console.log('updating state')
		    		this.setState({ isLoading: false, error: 'Login attempt failed' })
		    	}
		    })
	  		.catch(err => console.log(err))
  	}

  	removeKey(idx) {

  	}


	render() {
		if (this.state.isLoading) return <Spinner />

		return (
			<div style={{width: '25%', margin: '10px'}}>
				<FormControl label="User ID">
					<Input
			          value={this.state.form.userId}
			          onChange={this.handleUserIdChange}
			          placeholder="Required"
			          clearOnEscape
			        />
			    </FormControl>

			    <FormControl label="LNURL">
					<LnAuth lnurl={this.state.lnurl} linkingKeys={this.state.form.keys} onKeyRemove={this.removeKey} />
				</FormControl>
				<Button style={{marginTop: '10px'}} onClick={this.login} color="primary">Login</Button>
				{this.state.error ? <p>{this.state.error}</p> : null}
			</div>
		)
	}
}

export default withRouter(UserLogin);
