import React, { useState,useEffect } from "react";
import { withRouter } from "react-router";
import { Error, Warning, Info } from '../../common/Notifications'
// import { StatelessAccordion, Panel } from "baseui/accordion";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import LnurlWithdraw from './LnurlWithdraw'
import { server } from '../../../api';
import Spinner from '../../common/Spinner';
import { FormControl } from "baseui/form-control";

const detailsStyle = {border: '1px solid', margin: '10px', padding: '10px'}

const WithdrawController = ({ wallet, onUpdate, history }) => {
	const { _id, lnd_balance, destination_pub_key } = wallet
	const [ expanded, setExpanded ] = useState('p1')
	const [ pubKey, updateDestNode] = useState(destination_pub_key)
	const [ isLoading, setLoading ] = useState(false)
	const [ errorMsg, setError ] = useState(null)

	// TODO show modal with withdrawal info (Node Pub Key + amount)
	const ampWithdraw = () => {
		setLoading(true)
		server.withdrawFunds(_id, { amount: lnd_balance, destination: pubKey })
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
		history.push(`/users/${_id}/wallet`)
	}

	return (
		<Spinner isActive={isLoading}>
			<Error message={errorMsg} />
			<div style={{maxWidth: '400px'}}>
				<div style={detailsStyle}>
			      <p>Amount: {lnd_balance} sats</p>
			    </div>
				<FormControl label="LNURL-withdraw">
				    <LnurlWithdraw userId={_id} amount={lnd_balance} onCompletion={onUpdate} />
				</FormControl>
				<hr />
				<FormControl label="Send to Lightning Address">
				    <div style={{display: 'flex'}}>
						<Input
				          value={pubKey || ''}
				          onChange={(evt) => updateDestNode(evt.target.value)}
				          placeholder="Pub Key"
				          clearOnEscape
				          overrides={{
					          Root: {
					            style: {
					              width: '70%',
					              marginRight: '5px',
					            },
					          },
					        }}
				        /> 
						<Button onClick={ampWithdraw}>
							Withdraw
						</Button>
					</div>
				</FormControl>
			</div>
		</Spinner>
	)
	// return (
	// 	<Spinner isActive={isLoading}>
	// 		<Error message={errorMsg} />
	// 		<div style={{maxWidth: '400px'}}>
	// 		<StatelessAccordion
	// 					expanded={expanded}
	// 			      	onChange={({key, expanded}) => setExpanded(expanded) }>
	// 		    	<Panel key='p1' title="LNURL-withdraw">
	// 		      			<LnurlWithdraw userId={_id} amount={lnd_balance} onCompletion={onUpdate} />
	// 		      	</Panel>			    
	// 		      <Panel key='p2' title="AMP">
	// 		      		<Warning message='Receiver must support amp payments' />
	// 		      		<div>
	// 						{lnd_balance} sats to 
	// 						<Input
	// 				          value={pubKey || ''}
	// 				          onChange={(evt) => updateDestNode(evt.target.value)}
	// 				          placeholder="Pub Key"
	// 				          clearOnEscape
	// 				        /> 
	// 						<Button style={{margin: '10px'}} onClick={ampWithdraw}>
	// 							Withdraw
	// 						</Button>
	// 					</div>
	// 		      </Panel>			  
	// 		</StatelessAccordion>
	// 		</div>
	// 	</Spinner>
	// )
}

export default withRouter(WithdrawController)