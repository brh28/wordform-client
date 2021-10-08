import React, {Component} from 'react';
import { withRouter } from "react-router";

class ArticleContent extends Component {
  render() {
  	return (
		  <div>
		    <h1>{this.props.title}</h1>
		    <p>{this.props.content}</p>
		  </div>
    );
  }
}

// export default withRouter(UserPost);
export default ArticleContent;

