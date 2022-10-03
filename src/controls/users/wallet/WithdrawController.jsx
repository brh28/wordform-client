import React, { useState } from "react";
import { Error, Warning, Info } from '../../common/Notifications'
import { StatelessAccordion, Panel } from "baseui/accordion";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import LnurlWithdraw from './LnurlWithdraw'
import { server } from '../../../api';
import Spinner from '../../common/Spinner';

const WithdrawController = ({ wallet, onUpdate }) => {
	const { _id, lnd_balance, destination_pub_key } = wallet
	const [ expanded, setExpanded ] = useState('p1')
	const [ pubKey, updateDestNode] = useState(destination_pub_key)
	const [ isLoading, setLoading ] = useState(false)
	const [ errorMsg, setError ] = useState(null)

	// TODO show modal with withdrawal info (Node Pub Key + amount)
	const ampWithdraw = () => {
		setLoading(true)
		server.withdrawFunds(_id, lnd_balance)
			.then(resp => resp.json())
			.then((resp) => {
				if (resp.error) {
					setLoading(false)
					setError(resp.error)
				} else {
					setLoading(false)
					onUpdate(`Withdrawal successful. Payment hash: ${resp.payment_hash}`)
				}
			})
			.catch((e) => { 
				setLoading(false)
				setError('Withdrawal failed.')
			})
	}
	if (!lnd_balance || lnd_balance <= 0) {
		return (<Info message={'Account balance is 0'} />)
	}
	return (
		<Spinner isActive={isLoading}>
			<Error message={errorMsg} />
			<StatelessAccordion
						expanded={expanded}
				      	onChange={({key, expanded}) => setExpanded(expanded) }>
			    	<Panel key='p1' title="LNURL-withdraw">
			      			<LnurlWithdraw userId={_id} amount={lnd_balance} />
			      	</Panel>			    
			      <Panel key='p2' title="AMP">
			      		<Warning message='Receiver must support amp payments' />
			      		<div>
							{lnd_balance} sats to 
							<Input
					          value={pubKey || ''}
					          onChange={(evt) => updateDestNode(evt.target.value)}
					          placeholder="Pub Key"
					          clearOnEscape
					        /> 
							<Button style={{margin: '10px'}} onClick={ampWithdraw}>
								Withdraw
							</Button>
						</div>
			      </Panel>			  
			</StatelessAccordion>
		</Spinner>
	)
}

export default WithdrawController