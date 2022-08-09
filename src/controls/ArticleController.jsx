import React, {Component} from 'react';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { Error } from './common/Notifications'
import ArticleView from './articles/ArticleView'
import Spinner from "./common/Spinner";
import { ReadInvoice, PublishInvoice, InvoiceDetails } from './common/Invoices'
import { server } from "../api"
import Routes from '../routes'

class ArticleController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      article: null,
      readPaywall: null,
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
      .then(res => { this.setState({ isLoading: false, ...res}) })
      .catch(err => { this.setState({ isLoading: false, error: 'Failed to load'}) } )
  }

  deleteArticle(id) {
    this.setState({ isLoading: true })
    server.deleteArticle(id)
      .then(() => {
        const returnUrl = this.props.returnUrl || Routes.root
        this.props.history.push(returnUrl)
      })
  }

  render() {
    const { isLoading, article, readPaywall, publishPaywall, error } = this.state
    
    console.log(error)
    if (isLoading) return <Spinner isActive={isLoading} />
    else if (error) return (
      <div>
        <InvoiceDetails {...readPaywall} />
        <Error message={error} />
      </div>
    )
  	else if (readPaywall) return <ReadInvoice {...readPaywall} />
    else if (article) return <ArticleView viewerId={this.props.viewerId} {...article} onDelete={this.deleteArticle} />
    else return <Error message='Unknown Error' />
  }
}

export default withRouter(ArticleController);
