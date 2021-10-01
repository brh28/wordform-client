import React, {Component} from 'react';


import { withRouter } from "react-router";
import LnUrlDisplay from './LnUrlDisplay'
import Spinner from "./Spinner";
import { PublishInvoice as Invoice } from './Invoices'

import { withCookies, Cookies } from 'react-cookie';

class PublishArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: false,
		  paywall: null
		};
		this.getInvoice = this.getInvoice.bind(this);
	}

	componentDidMount() {
		this.getInvoice()
	}

	getInvoice() {
		this.setState({ isLoading: true })
		fetch(`/api/articles/${this.props.match.params.id}/invoice`)
			.then(res => res.json())
			.then(res => this.setState({
				isLoading: false,
				...res 
			}))
	}

  render() {
  	if (this.state.isLoading) return <Spinner />
  	else return <Invoice {...this.state.paywall} />
  }
}

export default withRouter(PublishArticle)

      