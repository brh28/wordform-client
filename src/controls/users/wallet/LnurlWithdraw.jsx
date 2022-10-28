import React, {Component} from 'react';
import Spinner from "../../common/Spinner";
import WalletPort from "../../common/WalletPort";
import { Button } from "baseui/button";
import { server } from '../../../api'; 
import { requestProvider } from 'webln';

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

	async fetchLnurl() {
		server.getLnurl()
			.then(async res => {
				this.setState( { isLoaded: true, lnurl: res.lnurl })
				try {
		          	const webln = await requestProvider();
		          	if (webln && webln.lnurl) {
		          		const resp = await webln.lnurl(res.lnurl);
						this.props.onCompletion('Success!')
		          	}
		        } catch (err) {
		          console.log(err)
		        }
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