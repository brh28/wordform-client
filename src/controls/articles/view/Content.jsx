import React, {Component} from 'react';
import { withRouter } from "react-router";
import RateContent from "./RateContent"
import { getUserId } from '../../../data/storage'

class ArticleContent extends Component {
  render() {
  	const isAuthor = getUserId() === this.props.author
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