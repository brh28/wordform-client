import React, {Component, useState} from 'react';
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

const regExStr = '^(?=[a-zA-Z])[a-zA-Z0-9]{3,20}$' // todo consolidate in backend
const userIdRegEx =  new RegExp(regExStr)

const SignIn = ({ onSignIn, history }) => {
	const [linkingKeys, setLinkingKeys] = useState([]);
	const [associatedUsers, setAssociatedUsers] = useState([]);
	const [minKeys, setMinKeys] = useState(1);
	const [userId, setUserId] = useState('');
	const [idValidation, setIdValidation] = useState({ isChecked: false, error: null });
	const [idTimer, setIdTimer] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const addSigner = (updatedSignersStr) => {
		const signers = JSON.parse(updatedSignersStr);
		setLinkingKeys(signers.linking_keys);
		setAssociatedUsers(signers.associatedUsers);
		// this.setState({ form: { 
		// 	createUser: !signers.associatedUsers.length
	}

	const updateKeys = (updatedKeySet) => {
		const updatedMinKeys = minKeys > updatedKeySet.length ? updatedKeySet.length : minKeys
		setMinKeys(updatedMinKeys);
		setLinkingKeys(updatedKeySet); 
	}

  	const handleUserIdChange = (event) => {
	    const updatedId = event.target.value

	    setUserId(updatedId);
	    setIdValidation(!userIdRegEx.test(updatedId) 
	    	? { 
        		isChecked: true, 
        		error: 'Not a valid ID (' + regExStr + ')' 
        	}
        	: {
		        isChecked: false,
		        error: null
		    }
		)

	    if (idTimer) clearTimeout(idTimer)
	    if (updatedId && updatedId !== '') {
	    	setIdTimer(
	    		setTimeout(() => {
			         	if (!idValidation.error) {
				          	server.getUserProfile(updatedId)
				          		.then(result => {
					            	setIdValidation({
					            		isChecked: true, 
					            		error: result.isAvailable ? null : "ID is not available" 
					            	})
					      	  	})
			        }
			      }, 1000)
	    	)
	    }
	}

	const updateMinKey = (val) => setMinKeys(val)

	const login = (user) => {
  		setLoading(true);
	    server.login(user)
		    .then(resp => {
		    	if (resp.status === 200) {
		    		resp.json().then(r => {
		    					      	console.log('from server: ' + r.userId)

		    			onSignIn(r.userId);
    					history.push(Routes.root) // navigate back to browse
		    		})
		    	} else {
		    		setLoading(false);
		    		setError('Login attempt failed')
		    	}
		    })
	  		.catch(err => console.log(err))
  	}
  	
	const createUser = () => {
		setLoading(true);
		server.postUser({ userId, linkingKeys, minKeys })
		  .then(res => {
		    if (res.status === 200) {
		      res.json().then(r => {
		        onSignIn(r.userId);
		        const returnUrl = history.location.state && history.location.state.returnUrl
		        history.push(Routes.root)
		      })
		    } else {
		      setLoading(false);
		      setError('Error creating user');
		    }
		  });
	}

	return (
		<div style={{ maxWidth:'400px'}}>
			<Spinner isActive={isLoading}>
				<Error message={error} />
                <FormControl label={<p>Sign the Lnurl. Learn more <StyledLink href={'https://wordform.space/articles/6349d5c338bc7e719edb9162'} target="_blank">here</StyledLink></p>}>
					<LnAuth onSignature={addSigner} />
				</FormControl>
				{(linkingKeys.length > 0) && !associatedUsers.length
					? <div>
						<FormControl label="Linked Keys:">
			        		<LinkingKeys keys={linkingKeys} onUpdate={updateKeys} />
				    	</FormControl>
				    	<FormControl
							label="New user? Create an ID"
							caption="Must be unique"
							positive={idValidation.isChecked && !idValidation.error ? "ID is available" : false}
							error={idValidation.isChecked && idValidation.error}
		                >
							<Input
								value={userId}
								onChange={handleUserIdChange}
								placeholder="Required"
								clearOnEscape
		                  />
                		</FormControl>
                		<Button onClick={createUser} color='primary'>Create User</Button>
                	</div>
			    	: null
				}
				{associatedUsers.length > 0 ? 
				    <FormControl label="Sign in as:">
				    	<div>
				    		{associatedUsers.map((u, uIdx) => {
					    		return (
									<Button 
										kind={KIND.secondary}
										shape={SHAPE.pill}
										disabled={!u.authorized}
										onClick={() => login(u._id)}>
										{u._id}
									</Button> 
								)
					    	})}
						</div>
					</FormControl>
					: null
				}
			</Spinner>
		</div>
	)
}

SignIn.contextType = User 

export default withRouter(SignIn);
