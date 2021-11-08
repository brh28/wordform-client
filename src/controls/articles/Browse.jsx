import React, {Component} from 'react';
import Spinner from '../common/Spinner';
import ArticleTile from './view/Tile.jsx'
import Api from '../../data/api';
import { Error } from '../common/Notifications'

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
		Api.browse()
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
	    	{ this.props.user ? null : <Error message='Must log in to access paid content' />}
			{ 
				this.state.isLoaded ? this.state.articles.map((elem, idx) => <ArticleTile key={idx} accessable={this.props.user || (elem.price && elem.price.amount === 0)} {...elem} />) : <Spinner />
			} 
		</div>
	  )
	}
}

export default BrowseArticles;
