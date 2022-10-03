import React, {Component} from 'react';
import { withRouter, Switch, Route } from "react-router";
import Spinner from '../../common/Spinner';
import { Success, Error, Info } from '../../common/Notifications'

import { StyledLink } from "baseui/link";

import { server } from '../../../api';
import Settings from './Settings' 
import WithdrawController from './WithdrawController'

class UserWallet extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { 
	    	isLoading: false, 
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
			.then(res => this.setState( { isLoading: false, wallet: res }))
	}

	returnToRoot(msg) {
		const returnUrl = `${this.props.match.url}/wallet`
		this.setState({ successMessage: msg })
		this.props.history.push(returnUrl)
	}

	// saveForm() {
	// 	this.setState({ isLoading: true })
	// 	server.updateWallet(this.state.wallet)
	// 		.then(() => this.setState({ 
	// 			isLoading: false,
	// 			successMessage: "Wallet information saved successfully!" 
	// 		}))
	// }

	// // TODO show modal with withdrawal info (Node Pub Key + amount)
	// withdraw() {
	// 	const amt = this.state.amt
	// 	this.setState({ isLoading: true })
	// 	server.withdrawFunds(this.props.userId, amt)
	// 		.then(resp => resp.json())
	// 		.then((resp) => {
	// 			if (resp.error) {
	// 				this.setState({
	// 					isLoading: false,
	// 					errorMessage: `Withdrawal failed with reason: ${error}`
	// 				})
	// 			} else {
	// 				this.setState({
	// 					isLoading: false,
	// 					successMessage: `Withdrawal successful. Payment hash: ${resp.payment_hash}`,
	// 					wallet: {
	// 						...this.state.wallet,
	// 						lnd_balance: resp.lnd_balance
	// 					}
	// 				})
	// 			}
	// 		})
	// 		.catch((e) => { 
	// 			this.setState({
	// 				isLoading: false, 
	// 				errorMessage: 'Withdrawal failed!'
	// 			})
	// 		})
	// }

	render() {
		const { url, params, path } = this.props.match;
		const { pathname } = this.props.history.location
		const { lnd_balance } = this.state.wallet

		const detailsStyle = {border: '1px solid', margin: '10px', padding: '10px'}

		return (
			<Spinner isActive={this.state.isLoading}>

			<Switch>
				<Route exact path={`${url}/wallet`}>
					<div>
						<Success message={this.state.successMessage} />
				      	<Error message={this.state.errorMessage} />
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
		)
	}
}

export default withRouter(UserWallet)