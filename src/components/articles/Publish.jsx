import React, {Component} from 'react';
import { withRouter } from "react-router";
import WalletPort from '../common/WalletPort'
import Spinner from "../common/Spinner";
import { Error } from "../common/Notifications";
import Invoice from '../common/Invoices'
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
		this.articleId = props.match.params.id
		// this.eventSource = new EventSource(`/api/articles/${this.props.match.params.id}/invoice`);
		this.publishArticle = this.publishArticle.bind(this);
	}

	componentDidMount() {
		this.publishArticle()
	}

	publishArticle() {
		this.setState({ isLoading: true })
		server.publishArticle(this.articleId)
			.then(res => {
				if (res.status === 403) {
					this.setState({ isLoading: false, error: "The author must be logged in."})
				} else if (res.status === 404) {
					this.setState({ isLoading: false, error: "404 - Could not find article"})
				} else if (res.status === 500) {
					this.setState({ isLoading: false, error: "Something went wrong"})
				} else {
					res.json().then(r => {
						if (r.articleDetails.isPublished) {
							this.props.history.push(`/users/${r.articleDetails.author}/profile`)
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
  	else return (
  		<Invoice type='publish' 
  				paymentDetails={this.state.paywallDetails} 
  				paymentRequest={this.state.paywallDetails.paymentRequest} />
  	)
  }
}

export default withRouter(PublishArticle);

      