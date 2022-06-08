import React, {Component} from 'react';
import Spinner from "./common/Spinner";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Toggle from './common/Toggle';

import { server } from '../api'; 

class UserWallet extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { isLoading: true, wallet: undefined };

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
		server.updateWallet(this.state.wallet).then(() => window.location.reload(false))
	}

	// TODO show modal with withdrawal info (Node Pub Key + amount)
	withdraw() {
		const amt = this.state.amt
		this.setState({ isLoading: true })
		server.withdrawFunds(this.props.userId, amt).then(() => window.location.reload(false))
	}

	render () {
		if (this.state.isLoading) return <Spinner />
		else return <div>
			Balance: {this.state.wallet.lnd_balance} SAT
			<FormControl label="Destination Node">
				<Input
		          value={this.state.wallet.destination_pub_key || ''}
		          onChange={this.updateDestNode}
		          placeholder="Required for forwarding payments"
		          clearOnEscape
		        /> 
		    </FormControl>
		    <Toggle label="Automatic forwarding" checked={this.state.wallet.auto_pay || false} onSwitch={this.handleSwitchChange} />
			<Button onClick={this.saveForm}>Save</Button>
			<Button onClick={this.withdraw}>Withdraw</Button>
		</div>
	}
}

export default UserWallet