import React, {Component} from 'react';
import Spinner from '../common/Spinner';
import ArticleTile from './view/Tile.jsx'
import { localStorage, server } from '../../api';
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
		server.browse()
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
	  const user = localStorage.getUserId()
	  return (
	    <div>
	    	{ user ? null : <Error message='Must log in to access paid content' />}
			{ 
				this.state.isLoaded ? this.state.articles.map((elem, idx) => <ArticleTile key={idx} accessable={user || (elem.price && elem.price.amount === 0)} {...elem} />) : <Spinner />
			} 
		</div>
	  )
	}
}

export default BrowseArticles;
