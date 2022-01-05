import React, {Component} from 'react';
import Spinner from "./common/Spinner";
// import WalletPort from "./common/WalletPort"
import { Button } from "baseui/button";
import { server } from '../api'; 

class UserWallet extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { copied: false };
	    this.fetchWallet = this.fetchWallet.bind(this)
	    this.drainWallet = this.drainWallet.bind(this)
	}

	componentDidMount() {
		this.fetchWallet()
	}

	fetchWallet() {
		server.getUserWallet(this.props.userId).then(res => this.setState( { isLoading: false, ...res }))
	}

	drainWallet() {
		server.drainWallet(this.props.userId)
	}

	render () {
		if (this.state.isLoading) return <Spinner />
		else return <div>
			Balance: {this.state.lnd_balance} SAT
			<Button onClick={this.drainWallet}>Drain</Button>
			{/*<WalletPort connection={this.state.withdraw_url} />*/}
		</div>
	}
}

export default UserWallet