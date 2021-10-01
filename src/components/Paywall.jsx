import React, {Component} from 'react';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import ArticleView from './ArticleView'
import LnUrlDisplay from './LnUrlDisplay'
import Spinner from "./Spinner";
import { ReadArticle as Invoice } from './Invoices'

import { withCookies, Cookies } from 'react-cookie';

class Paywall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      article: undefined,
      paywall: undefined,
      error: null
    };
    this.checkPayment = this.checkPayment.bind(this);
  }

  componentDidMount() {
    this.checkPayment()
  }

  checkPayment() {
    this.setState({ isLoading: true })
    fetch(`/api/articles/${this.props.match.params.id}`, {})
      .then(res => res.json())
      .then(res => this.setState({
        isLoading: false,
        ...res 
      }))
  }

  render() {
    const { isLoading, article, paywall, error } = this.state

    if (isLoading) return <Spinner />
  	else if (article) return <ArticleView {...article} />
  	else if (paywall) return <Invoice {...paywall} />
    else return <Error message={this.state.error || 'Unknown Error'} />
  }
}

const Error = ({ message }) => <p>{message}</p>

export default withRouter(withCookies(Paywall));
