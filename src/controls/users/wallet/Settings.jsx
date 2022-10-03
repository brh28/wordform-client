import React, { useState } from 'react';
import { FormControl } from "baseui/form-control";
import Toggle from '../../common/Toggle';
import { Success, Error, Warning } from '../../common/Notifications'
import Spinner from '../../common/Spinner';
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { server } from '../../../api';


const Settings = ({ wallet, onUpdate }) => {
	// if (wallet) {
		const [autoPay, setAutoPay] = useState(wallet.auto_pay)
		const [pubKey, setPubKey] = useState(wallet.destination_pub_key)
		const [isLoading, setLoadingState] = useState(false)
		const [errMsg, setError] = useState(null)
	// } else {

	// }
		
	const handleSwitchChange = (arg) => setAutoPay(arg)
	const updatePubKey = (event) => setPubKey(event.target.value)
	const saveForm = () => {
		setLoadingState(true)
		server.updateWallet({ 
			auto_pay: autoPay,
			destination_pub_key: pubKey
		}).then(() => { 
			onUpdate("Wallet settings updated!")
		}).catch(err => {
			console.log(err)
			setLoadingState(false)
			setError('Failed to update.')
		})
	}
	return (
		<Spinner isActive={isLoading}>
			<table>
				<tr>
					<td>
      					<FormControl label="Auto-forward with AMP">
					    	<Toggle checked={autoPay || false} onSwitch={handleSwitchChange} />
					    </FormControl>
		    		</td>
	    			<td>
	    				<Warning message='Receiver must support amp payments' />
	    			</td>
	    		</tr>
	    	</table>
			<FormControl label="Lightning Pub Key">
				<Input
		          value={pubKey || ''}
		          onChange={updatePubKey}
		          placeholder="Required for forwarding payments"
		          clearOnEscape
		        /> 
		    </FormControl>
		    <Button onClick={saveForm}>Save</Button>
		</Spinner>
	)
}

export default Settings