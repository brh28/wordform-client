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
		  paywallDetails: null,
		  articleDetails: null,
		  isPurchased: undefined
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
		const articleId = this.props.match.params.id
		this.setState({ isLoading: true })
		server.getInvoice(articleId)
			.then(res => {
				if (res.status === 403) {
					this.setState({ isLoading: false, error: "The author must be logged in."})
				} else if (res.status === 404) {
					this.setState({ isLoading: false, error: "404 - Could not find article"})
				} else {
					res.json().then(r => {
						if (r.articleDetails.isPurchased) {
							this.props.history.push(`/users/${r.articleDetails.author}`)
						} else {
							this.setState({ isLoading: false, ...r })
						}
					})
				}
			})
	}

  render() {
  	if (this.state.isLoading) return <Spinner isActive={this.state.isLoading} />
  	else if (this.state.error) return <Error message={this.state.error} />
  	else return <Invoice {...this.state.paywallDetails} />
  }
}

export default withRouter(PublishArticle)

      