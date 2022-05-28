import React, {Component} from 'react';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import ArticleView from './articles/view/Content'
import Spinner from "./common/Spinner";
import { ReadInvoice, PublishInvoice } from './common/Invoices'
import { server } from "../api"

class ArticleController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      article: null,
      readPaywall: null,
      publishPaywall: null,
      error: null
    };
    this.load = this.load.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this)
  }

  componentDidMount() {
    this.load()
  }

  load() {
    this.setState({ isLoading: true })

    server.get(this.props.match.params.id)
      .then(res => {
        this.setState({ isLoading: false, ...res})
        // if (res.status === 200) {
        //   res.json().then(res => this.setState({
        //     isLoading: false,
        //     ...res 
        //   }))
        // } else if (res.status === 402) {
        //   res.json().then(r => {
        //     if (r.paywall) this.setState({ isLoading: false, ...r })
        //     else this.setState( { isLoading: false, error: 'This article is behind a paywall. User must log in to receive invoice.' })
        //   })
        // } else {
        //   this.setState( { isLoading: false, error: 'General Error' })
        // }
      })
  }

  deleteArticle(id) {
    this.setState({ isLoading: true })
    server.deleteArticle(id)
      .then(() => {
        const returnUrl = this.props.returnUrl || '/browse'
        this.props.history.push(returnUrl)
      })
  }

  render() {
    const { isLoading, article, readPaywall, publishPaywall, error } = this.state
    
    if (isLoading) return <Spinner />
  	else if (article) return <ArticleView viewerId={this.props.viewerId} {...article} onDelete={this.deleteArticle} />
  	else if (readPaywall) return <ReadInvoice {...readPaywall} />
    else if (publishPaywall) return <PublishInvoice {...publishPaywall} />
    else return <Error message={this.state.error || 'Unknown Error'} />
  }
}

const Error = ({ code, message }) => <p>{message}</p>

export default withRouter(ArticleController);
