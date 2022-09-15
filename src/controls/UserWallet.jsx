import React, {Component} from 'react';
import { FormControl } from "baseui/form-control";
import { Success, Error, Info } from './common/Notifications'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Toggle from './common/Toggle';
import { StatelessAccordion, Panel } from "baseui/accordion";
import LnurlWithdraw from './users/wallet/Withdraw'
import { server } from '../api'; 

class UserWallet extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { 
	    	isLoading: true, 
	    	wallet: { 
	    		lnd_balance: undefined,
	    		auto_pay: undefined,
	    		destination_pub_key: undefined, 
	    	},
	    	successMessage: undefined,
	    	errorMessage: undefined,
	    	expanded: 'p1' 
	    };

	    this.fetchWallet = this.fetchWallet.bind(this)
	    this.handleSwitchChange = this.handleSwitchChange.bind(this)
	    this.updateDestNode = this.updateDestNode.bind(this)
	    this.saveForm = this.saveForm.bind(this)
	    this.withdraw = this.withdraw.bind(this)
	}

	componentDidMount() {
		this.fetchWallet()
	}

	fetchWallet() {
		server.getUserWallet(this.props.userId).then(res => this.setState( { isLoading: false, wallet: res }))
	}

	handleSwitchChange() {
		this.setState({ 
			wallet: {
				...this.state.wallet,
				auto_pay: !this.state.wallet.auto_pay
			}
		})
	}

	updateDestNode(event) {
		this.setState({ 
			wallet: {
				...this.state.wallet,
				destination_pub_key: event.target.value
			}
		})
	}

	saveForm() {
		this.setState({ isLoading: true })
		server.updateWallet(this.state.wallet)
			.then(() => this.setState({ 
				isLoading: false,
				successMessage: "Wallet information saved successfully!" 
			}))
	}

	// TODO show modal with withdrawal info (Node Pub Key + amount)
	withdraw() {
		const amt = this.state.amt
		this.setState({ isLoading: true })
		server.withdrawFunds(this.props.userId, amt)
			.then(resp => resp.json())
			.then((resp) => {
				if (resp.error) {
					this.setState({
						isLoading: false,
						errorMessage: `Withdrawal failed with reason: ${error}`
					})
				} else {
					this.setState({
						isLoading: false,
						successMessage: `Withdrawal successful. Payment hash: ${resp.payment_hash}`,
						wallet: {
							...this.state.wallet,
							lnd_balance: resp.lnd_balance
						}
					})
				}
			})
			.catch((e) => { 
				this.setState({
					isLoading: false, 
					errorMessage: 'Withdrawal failed!'
				})
			})
	}

	render() {
		const { lnd_balance } = this.state.wallet
		return (
			<div>
				<Success message={this.state.successMessage} />
		      	<Error message={this.state.errorMessage} />
				<StatelessAccordion
					expanded={this.state.expanded}
			      	onChange={({key, expanded}) => {
				        this.setState({ expanded: expanded })
				      }}
			    >
			    	<Panel key='p1' title="LNURL-withdraw">
			      		{ lnd_balance && lnd_balance > 0 
			      			? <LnurlWithdraw userId={this.props.userId} />
			      			: <Info message='Account balance is empty' /> }
			      	</Panel>			    
			      <Panel key='p2' title="One-time AMP">
			      		<Info message='Destination node must support receiving amp payments' />
			      		{ lnd_balance && lnd_balance > 0 ? <div>
							{lnd_balance} sats to 
							<Input
					          value={this.state.wallet.destination_pub_key || ''}
					          onChange={this.updateDestNode}
					          placeholder="Pub Key"
					          clearOnEscape
					        /> 
							<Button style={{margin: '10px'}} onClick={this.withdraw}>
								Withdraw
							</Button>
						</div>
						: <Info message='Account balance is empty' /> }
			      </Panel>		
			      <Panel key='p3'title="Auto-pay with AMP">
			      		<Info message='Destination node must support receiving amp payments' />
			      		<FormControl label="Forwarding">
					    	<Toggle checked={this.state.wallet.auto_pay || false} onSwitch={this.handleSwitchChange} />
					    </FormControl>
						<FormControl label="Lightning Pub Key">
							<Input
					          value={this.state.wallet.destination_pub_key || ''}
					          onChange={this.updateDestNode}
					          placeholder="Required for forwarding payments"
					          clearOnEscape
					        /> 
					    </FormControl>
					    <Button onClick={this.saveForm}>Save</Button>
			      </Panel>	  
			    </StatelessAccordion>
		    </div>
		)
	}
}

export default UserWallet