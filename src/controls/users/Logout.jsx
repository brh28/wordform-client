import React, {Component} from 'react';
import { withRouter } from "react-router";
import { Button } from "baseui/button";
import Spinner from '../common/Spinner';

class UserLogout extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoading: false,
	    };
	    this.logout = this.logout.bind(this);
	}

	logout() {
  		this.setState({ isLoading: true })
  		fetch(`/api/users/logout`, {
  			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        }, 
	    })
	    .then((result) => {
	    	console.log('logging out')
  			localStorage.clear();
  			this.props.history.push('/login')
  			window.location.reload(false)
  		})
  	}

  	render() {
  		if (this.state.isLoading) return (<Spinner />)
  		return (<Button style={{marginTop: '10px'}} onClick={this.logout} color="primary">Logout</Button>)
  	}
}

export default withRouter(UserLogout);
