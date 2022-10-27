import React, {Component} from 'react';
import WalletPort from './WalletPort'
import Spinner from './Spinner';
import { server } from '../../api'
import { requestProvider } from 'webln';
import { Button, KIND, SIZE, SHAPE } from "baseui/button";

class LnAuth extends Component {
	constructor(props) {
	    super(props);
	    this.eventSource = new EventSource("/api/sessions/lnurl");
	    this.state = {
	    	isLoaded: false,
	    	lnurl: undefined,
	    	webln: null,
	    	weblnAlias: null 
	    };
	}

	async componentDidMount() {
		this.eventSource.addEventListener("newLnurl", async e => {
		      const { lnurl } = JSON.parse(e.data)
		      this.setState({ lnurl: lnurl, isLoaded: true });

		      const webln = await requestProvider();
			if (webln && webln.lnurl) {
				const {node} = await webln.getInfo()
				this.setState({ webln: webln, weblnAlias: node.alias }) 
			} else { 
				console.log('webln: lnurl not found')  
			}
			})

		this.eventSource.addEventListener("keySign", e => {
		  this.props.onSignature(e.data)
		})

		
	}

	componentWillUnmount() {
		this.eventSource.close();
	}	

	render() {
		const { isLoaded, lnurl, webln, weblnAlias} = this.state
		return (
			<Spinner isActive={!this.state.isLoaded}>
				{ webln ? <Button size={SIZE.compact} 
								shape={SHAPE.pill}
								onClick={() => webln.lnurl(lnurl)} kind={KIND.secondary}>
									{weblnAlias ? `Sign with connected wallet: ${weblnAlias}`: 'Sign with connected wallet'}
							</Button> : null }
				<WalletPort connection={this.state.lnurl} />
			</Spinner>
		)
	}
}

export default LnAuth;
