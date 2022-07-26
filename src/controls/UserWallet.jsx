import React, {Component} from 'react';
import Spinner from "./common/Spinner";
import { FormControl } from "baseui/form-control";
import { Success, Info } from './common/Notifications'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Toggle from './common/Toggle';
import { StatelessAccordion, Panel } from "baseui/accordion";
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
		server.withdrawFunds(this.props.userId, amt).then(() => window.location.reload(false))
	}

	// render () {
	// 	const { lnd_balance } = this.state.wallet
	// 	return (
	// 		<Spinner isActive={this.state.isLoading}>
				// <Success message={this.state.successMessage} />
				// <FormControl label="Lightning Pub Key">
				// 	<Input
			 //          value={this.state.wallet.destination_pub_key || ''}
			 //          onChange={this.updateDestNode}
			 //          placeholder="Required for forwarding payments"
			 //          clearOnEscape
			 //        /> 
			 //    </FormControl>
				// <FormControl label="Automatic forwarding">
			 //    	<Toggle checked={this.state.wallet.auto_pay || false} onSwitch={this.handleSwitchChange} />
			 //    </FormControl>
			 //    <Button onClick={this.saveForm}>Save</Button>
	// 			<hr />
				// <FormControl label="Balance">
				// 	<div>
				// 		{lnd_balance} SAT
				// 		{ lnd_balance && lnd_balance > 0 ? 
				// 			<Button style={{margin: '10px'}} onClick={this.withdraw}>
				// 				Withdraw
				// 			</Button> : null }
				// 	</div>
				// </FormControl>
	// 		</Spinner>
	// 	)
	// }

	render() {
		const { lnd_balance } = this.state.wallet
		return (
			<StatelessAccordion
				expanded={this.state.expanded}
		      	onChange={({key, expanded}) => {
			        console.log(key);
			        this.setState({ expanded: expanded })
			      }}
		    >
		      <Panel key='p1'title="Auto-pay">
		      		<Success message={this.state.successMessage} />
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
		      <Panel key='p2' title="One-time manual">
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
		    </StatelessAccordion>
		)
	}
}

export default UserWallet