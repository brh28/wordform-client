import React, {Component} from 'react';
import { withRouter } from "react-router";
import { server } from "../../api"
import Spinner from "../common/Spinner";
import { ReadInvoice } from '../common/Invoices'
import { Error } from '../common/Notifications.jsx'
import PublishedArticle from './view/PublishedArticle'
import StagedArticle from './view/StagedArticle'

class ArticleView extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: false,
		  error: null,
		  paywallDetails: null,
		  articleDetails: null,
		  isPurchased: undefined
		};
		this.deleteArticle = this.deleteArticle.bind(this);
	}

	componentDidMount() {
	    this.setState({ isLoading: true })
	    server.get(this.props.id)
	      .then(res => { this.setState({ isLoading: false, ...res}) })
	      .catch(err => { this.setState({ isLoading: false, error: 'Failed to load'}) } )
	}

	deleteArticle() {
		server.deleteArticle(this.props.id)
	      .then(() => {
	        this.props.history.push(`/users/${this.props.user}`)
	      })
	      .catch(err => {
	      	console.log(err)
	      	this.setState({
	      		isLoading: false,
	      		error: err
	      	})
	      })
	}

	render() {
		const { user } = this.props
		const { article, readPaywall, error, onDelete } = this.state

	  	if (this.state.isLoading) return <Spinner isActive={this.state.isLoading} />
	  	if (readPaywall) return <ReadInvoice {...readPaywall} />
	  	if (article && !article.isPublished) return <StagedArticle article={article} onDelete={this.deleteArticle} />
	  	if (article && article.isPublished) return <PublishedArticle user={user} article={article} onDelete={this.deleteArticle} /> 
	  	if (error) return <Error message={error} />
	  	return <Error message='Unknown Error' /> 
	}
  	
}

export default withRouter(ArticleView);