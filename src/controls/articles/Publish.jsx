import React, {Component} from 'react';
import { withRouter } from "react-router";
import WalletPort from '../common/WalletPort'
import Spinner from "../common/Spinner";
import { Error } from "../common/Notifications";
import { PublishInvoice as Invoice } from '../common/Invoices'
import { server } from "../../api"

class PublishArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: true,
		  error: null,
		  paywall: null
		};
		// this.eventSource = new EventSource(`/api/articles/${this.props.match.params.id}/invoice`);
		this.getInvoice = this.getInvoice.bind(this);
	}

	componentDidMount() {
		// this.eventSource.onerror(e => {
		// 	console.log(e)
		// })
		this.getInvoice()
	}

	getInvoice() {
		this.setState({ isLoading: true })
		server.getInvoice(this.props.match.params.articleId)
			.then(res => {
				if (res.status === 401) {
					this.setState({ isLoading: false, error: "The author must be logged in."})
				} else {
					res.json().then(r => this.setState({ isLoading: false, ...r }))
				}
			})
	}

  render() {
  	if (this.state.isLoading) return <Spinner />
  	else if (this.state.error) return <Error message={this.state.error} />
  	else return <Invoice {...this.state.paywall} />
  }
}

export default withRouter(PublishArticle)

      