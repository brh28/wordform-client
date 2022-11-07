import React, {Component} from 'react';
import { withRouter } from "react-router";
import { server } from "../../api"
import Spinner from "../common/Spinner";
import { Error } from '../common/Notifications.jsx'
import PublishedArticle from './view/PublishedArticle'
import StagedArticle from './view/StagedArticle'
import ReadPaywall from './view/ReadPaywall'

class ArticleView extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: false,
		  error: null,
		  readPaywall: null,
		  article: null
		};
		this.reload = true
		this.load = this.load.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
	}

	componentDidMount() {
		this.setState({ isLoading: true })
	    this.load()
	    this.checkPaymentRequest = setInterval(() => {
	    	if (this.reload){
	    		this.load()
	    	}
	    }, 3000)
	}

	componentWillUnmount() {
		clearInterval(this.checkPaymentRequest)
	}

	load() {
	    server.get(this.props.id)
	      .then(res => { 
	      	this.setState({ isLoading: false, ...res})
	      	this.reload = Boolean(res.readPaywall && res.readPaywall.paymentRequest) 
	      })
	      .catch(err => { this.setState({ isLoading: false, error: 'Failed to load'}) } )
	}

	deleteArticle() {
		server
			.deleteArticle(this.props.id)
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
	  	if (article && !article.isPublished) {
	  		return <StagedArticle article={article}
	  							onEdit={this.load}
	  							onDelete={this.deleteArticle} />
	  	}
	  	if (article && article.isPublished) {
	  		return <PublishedArticle user={user} 
	  								article={article}
	  								onEdit={this.load} 
	  								onDelete={this.deleteArticle} /> 
	  	}
	  	if (readPaywall) return <ReadPaywall user={user} {...readPaywall} />
	  	if (error) return <Error message={error} />
	  	return <Error message='Unknown Error' /> 
	}
}

export default withRouter(ArticleView);