import React, {Component} from 'react';
import WalletPort from './WalletPort'
import Spinner from './Spinner';

class LnAuth extends Component {
	constructor(props) {
	    super(props);
	    this.eventSource = new EventSource("/api/sessions/lnurl");
	    this.state = {
	    	isLoaded: false,
	    	lnurl: undefined
	    };
	}

	componentDidMount() {
		this.eventSource.addEventListener("newLnurl", e => {
		      const { lnurl } = JSON.parse(e.data)
		      this.setState({ lnurl: lnurl, isLoaded: true });
		})

		this.eventSource.addEventListener("keySign", e => {
		  this.props.onSignature(e.data)
		})
	}

	componentWillUnmount() {
		this.eventSource.close();
		console.log('LnAuth: Closed EventSource')
	}	

	render() {
		return (
			<Spinner isActive={!this.state.isLoaded}>
				<WalletPort connection={this.state.lnurl} />
			</Spinner>
		)
	}
}

export default LnAuth;
