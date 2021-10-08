import React, {Component} from 'react';
import Spinner from '../common/Spinner';
import ArticleTile from './view/Tile.jsx'
import { articles } from '../../data/api';

class BrowseArticles extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  articles: []
		};
	}

	componentDidMount() {
		articles
			.browse()
			.then(
		        (result) => {
		          this.setState({
		            isLoaded: true,
		            articles: result
		          });
		        },
		        (error) => {
		          this.setState({
		            isLoaded: true,
		            error
		          });
		        }
		      )
  	}

	render() {
	  return (
	    <div>
	      { 
	        this.state.isLoaded ? this.state.articles.map((elem, idx) => <ArticleTile key={idx} {...elem} />) : <Spinner />
	      } 
		</div>
	  )
	}
}

export default BrowseArticles;
