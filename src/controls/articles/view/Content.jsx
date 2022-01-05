import React, {Component} from 'react';
import { withRouter } from "react-router";
import RateContent from "./RateContent"
import { localStorage } from '../../../api'

class ArticleContent extends Component {
  render() {
  	const isAuthor = localStorage.getUserId() === this.props.author
  	return (
		  <div>
		    <h1>{this.props.title}</h1>
		    <p>{this.props.content}</p>
		    {isAuthor ? null : <RateContent articleId={this.props._id} />}
		  </div>
    );
  }
}

export default ArticleContent;