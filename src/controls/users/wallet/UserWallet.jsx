import React, {Component} from 'react';
import { withRouter, Switch, Route } from "react-router";
import Spinner from '../../common/Spinner';
import { Success, Error, Info } from '../../common/Notifications'

import { StyledLink } from "baseui/link";

import { server } from '../../../api';
import Settings from './Settings' 
import WithdrawController from './WithdrawController'
import TransactionHistory from './TransactionHistory'

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
	    	errorMessage: undefined
	    };

	    this.fetchWallet = this.fetchWallet.bind(this)
	    this.returnToRoot = this.returnToRoot.bind(this)
	    // this.handleSwitchChange = this.handleSwitchChange.bind(this)
	    // this.updateDestNode = this.updateDestNode.bind(this)
	    // this.saveForm = this.saveForm.bind(this)
	    // this.withdraw = this.withdraw.bind(this)
	}

	componentDidMount() {
		this.fetchWallet()
	}

	fetchWallet() {
		this.setState({ isLoading: true })
		server.getUserWallet(this.props.userId)
			.then(res => {
				this.setState( { isLoading: false, wallet: res })
			})
	}

	returnToRoot(msg) {
		this.setState({ successMessage: msg })
		const returnUrl = `${this.props.match.url}/wallet`
		this.props.history.push(returnUrl)
		this.fetchWallet()
	}

	render() {
		const { url, params, path } = this.props.match;
		const { pathname } = this.props.history.location
		const { lnd_balance } = this.state.wallet
		const detailsStyle = {border: '1px solid', marginTop: '10px', padding: '10px'}
		return (
			<div>
				<Success message={this.state.successMessage} />
				<Error message={this.state.errorMessage} />
				<Spinner isActive={this.state.isLoading}>
					<Switch>
						<Route exact path={`${url}/wallet`}>
							<div>
							      	<table>
							      		<tbody>
								      		<tr>
								      			<td style={{paddingRight: '10px'}}>
								      				<div style={detailsStyle}>
								      					Balance: {lnd_balance} sats
								      				</div> 
								      			</td>
								      			{ lnd_balance && lnd_balance > 0 
								      		? <td style={{paddingRight: '10px'}}>
									      		<StyledLink 
									      			animateUnderline
						    						style={{cursor: 'pointer'}}
						    						onClick={() => this.props.history.push(`${pathname}/withdraw`)}>
							      					Withdraw
							    				</StyledLink>
						    				</td> 
						    				: null }
						    				<td style={{paddingRight: '10px'}}>
						    					<StyledLink 
						    						animateUnderline
						    						style={{cursor: 'pointer'}}
						    						onClick={() => this.props.history.push(`${pathname}/settings`)}>
						      						Settings
						    					</StyledLink>
						    				</td>
						    				</tr>
					    				</tbody>
					    			</table>
					    			<TransactionHistory withdrawals={this.state.wallet.withdrawals} />
						    </div>
				    	</Route>
						<Route exact path={`${url}/wallet/withdraw`}>
							<WithdrawController wallet={this.state.wallet} 
								onUpdate={this.returnToRoot} />
						</Route>
						<Route exact path={`${url}/wallet/settings`}>
							<Settings wallet={this.state.wallet} 
								onUpdate={this.returnToRoot} />
						</Route>
					</Switch>
				</Spinner>
			</div>
		)
	}
}

export default withRouter(UserWallet)