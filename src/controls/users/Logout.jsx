import React, {Component, useState} from 'react';
import { withRouter } from "react-router";
import { Button } from "baseui/button";
import Spinner from '../common/Spinner';
import { server, useLocalStorage } from '../../api';

// class UserLogout extends Component {
// 	constructor(props) {
// 	    super(props);
// 	    this.state = {
// 	    	isLoading: false,
// 	    };
// 	    this.logout = this.logout.bind(this);
// 	}

// 	logout() {
//   		this.setState({ isLoading: true })
//   		server.logout()
// 		    .then((result) => {
// 		    	console.log('logging out')
// 	  			localStorage.clear();
// 	  			this.props.history.push('/login')
// 	  			window.location.reload(false)
// 	  		})
//   	}

//   	render() {
//   		if (this.state.isLoading) return (<Spinner />)
//   		return (<Button style={{marginTop: '10px'}} onClick={this.logout} color="primary">Logout</Button>)
//   	}
// }

const UserLogout = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [userId, setUserId] = useLocalStorage()

	const logout = () => {
  		setIsLoading(true)
  		server.logout()
		    .then((result) => {
		    	console.log('logging out')
	  			setUserId(null)
	  			props.history.push('/login')
	  			//window.location.reload(false)
	  		})
  	}

	if (isLoading) return (<Spinner />)
	return <Button style={{marginTop: '10px'}} onClick={logout} color="primary">Logout</Button>
}

export default withRouter(UserLogout);
