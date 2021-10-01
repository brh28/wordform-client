import React, {Component} from 'react';
import PostTile from './PostTile.jsx'
import { Link } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";
import Spinner from './Spinner';

// import NavigationBar from "./NavigationBar"

class Browse extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  articles: []
		};
	}

	componentDidMount() {

	    const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
	    fetch(`/api/articles`, {headers:headers})
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            articles: result
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
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
	        this.state.isLoaded ? this.state.articles.map((elem, idx) => <PostTile key={idx} {...elem} />) : <Spinner />
	      } 
		</div>
	  )
	}
}

export default Browse;
