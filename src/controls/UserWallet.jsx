import React, {Component} from 'react';
import Spinner from "./common/Spinner";
import WalletPort from "./common/WalletPort"
import Api from '../data/api'; 

class UserWallet extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { copied: false };
	    this.fetchWallet = this.fetchWallet.bind(this)
	}

	componentDidMount() {
		this.fetchWallet()
	}

	fetchWallet() {
		Api.getUserWallet(this.props.userId).then(res => this.setState( { isLoading: false, ...res }))
	}

	render () {
		if (this.state.isLoading) return <Spinner />
		else return <div>
			Balance: {this.state.lnd_balance} SAT
			<WalletPort connection={this.state.withdraw_url} />
		</div>
	}
}

export default UserWallet