import React, {Component, useState} from 'react';
import { withRouter } from "react-router";
import { Button } from "baseui/button";
import Spinner from '../../common/Spinner';
import { server } from '../../../api';

export const Logout = withRouter((props) => {
	const [isLoading, setIsLoading] = useState(false)
	const logout = () => {
  		setIsLoading(true)
  		server.logout()
		    .then((result) => {
	  			props.history.push('/login')
	  			window.location.reload(false)
	  		})
  	}

  	return (
  		<Spinner isActive={isLoading}>
  			<Button style={{marginTop: '10px'}} onClick={logout} color="primary">Logout</Button>
  		</Spinner>
  	)
})


