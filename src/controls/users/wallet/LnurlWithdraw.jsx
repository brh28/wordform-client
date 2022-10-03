import React, {Component} from 'react';
import Spinner from "../../common/Spinner";
import WalletPort from "../../common/WalletPort";
import { Button } from "baseui/button";
import { server } from '../../../api'; 

//redudant - also in Invoices component
const detailsStyle = {border: '1px solid', margin: '10px', padding: '10px'}

class LnurlWithdraw extends Component {
	constructor(props) { 
	    super(props);
	    this.state = { 
	    	isLoaded: false,
	    	lnurl: undefined 
	    };
	    this.fetchLnurl = this.fetchLnurl.bind(this)
	}

	componentDidMount() {
		this.fetchLnurl()
	}

	fetchLnurl() {
		server.getLnurl()
			.then(res => {
				console.log(res)
				this.setState( { isLoaded: true, lnurl: res.lnurl })
			})
	}

	render() {
		return (
			<Spinner isActive={!this.state.isLoaded}>
				<div style={detailsStyle}>
			      <p>Amount: {this.props.amount} sats</p>
			    </div>
				<WalletPort connection={this.state.lnurl} />
			</Spinner>
		)
	}
}

export default LnurlWithdraw;