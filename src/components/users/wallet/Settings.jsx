import React, { useState } from 'react';
import { FormControl } from "baseui/form-control";
import Toggle from '../../common/Toggle';
import { Success, Error, Warning } from '../../common/Notifications'
import Spinner from '../../common/Spinner';
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";

import { server } from '../../../api';


const Settings = ({ wallet, goBack }) => {
	const [autoPay, setAutoPay] = useState(wallet.auto_pay)
	const [pubKey, setPubKey] = useState(wallet.destination_pub_key)
	const [isLoading, setLoadingState] = useState(false)
	const [errMsg, setError] = useState(null)
		
	const handleSwitchChange = (arg) => setAutoPay(arg)
	const onPubKeyChange = (event) => {
		setPubKey(event.target.value)
		if (!event.target.value) setAutoPay(false)
	}
	const saveForm = () => {
		setLoadingState(true)
		server.updateWallet({ 
			auto_pay: autoPay,
			destination_pub_key: pubKey
		}).then(() => { 
			goBack("Wallet settings updated!")
		}).catch(err => {
			console.log(err)
			setLoadingState(false)
			setError('Failed to update.')
		})
	}

	return (
		<Spinner isActive={isLoading}>
			<FormControl label="Lightning Address">
				<Input
		          value={pubKey || ''}
		          onChange={onPubKeyChange}
		          placeholder="Required for forwarding payments"
		          clearOnEscape
		        /> 
		    </FormControl>
			<FormControl label="">
		    	<Toggle checked={autoPay || false} 
		    			onSwitch={handleSwitchChange}
		    			disabled={!pubKey}
		    			label={'Auto-forward'} />
		    </FormControl>
		    <Button onClick={saveForm}>Save</Button>
		    <Button kind={KIND.secondary} 
		    	onClick={() => goBack()}
		    	overrides={{ Root: { style: {marginLeft: '5px'}}}}>
		    	Cancel
		    </Button>
		</Spinner>
	)
}

export default Settings