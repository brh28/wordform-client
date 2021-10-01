import React, {Component} from 'react';
import LnUrlDisplay from './LnUrlDisplay'
import SyncLoader from "react-spinners/SyncLoader";

// import { withCookies, Cookies } from 'react-cookie';

class LnAuth extends Component {

	constructor(props) {
	    super(props);
	    // this.eventSource = new EventSource("/api/users/authentication");
	}

	// componentDidMount() {
	// 	this.eventSource.addEventListener("newLnurl", e => {
	//       	const { lnurl } = JSON.parse(e.data)
	//       	this.setState({ lnurl: lnurl });
	// 	})

	// 	this.eventSource.addEventListener("keySign", e => {
	// 		this.props.onKeySign(e.data)
	// 	})

	// 	this.eventSource.addEventListener("loggedIn", e => {
	// 		this.props.onLogin(e.data)
	// 	});
 //  	}

 //  	componentWillUnmount() {
 //  		this.eventSource.close();
 //  	}

	render() {


		// Display signed keys from this.props.signedKeys
		return (<div>
			<LnUrlDisplay lnurl={this.props.lnurl} />
			<ul>{this.props.linkingKeys.map(k => <li key={k}>{k}</li>)}</ul>
		</div>)
	}
}

export default LnAuth;
