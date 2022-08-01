import React, {Component} from 'react';
import Spinner from '../common/Spinner';
import ArticleTile from './view/Tile.jsx'
import { localStorage, server } from '../../api';
import { Info, Error } from '../common/Notifications'
import InfiniteScroll from 'react-infinite-scroll-component';

class BrowseArticles extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoading: true,
		  articles: [],
		  hasMore: true
		};

		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData(null) 
  	}

  	fetchData() {
  		const lastEl = this.state.articles.at(-1)
  		const searchParams = this.props.searchBy || {}
  		if (lastEl) { searchParams.before = lastEl.purchase_date }
  		server.browse(searchParams)
			.then(
		        (resp) => {
		          this.setState({
		            isLoading: false,
		            articles: this.state.articles.concat(resp.results),
		            hasMore: resp.hasMore
		          });
		        },
		        (error) => {
		          this.setState({
		            isLoading: false,
		            error
		          });
		        }
		      )
  	}

	render() {
		const { articles, isLoading, hasMore } = this.state
		if (!isLoading && articles.length === 0) return <Info message='No articles' />
		return (
			<InfiniteScroll
			  dataLength={articles.length} 
			  next={this.fetchData}
			  hasMore={hasMore}
			  loader={<Spinner isActive={true} />}
			>
			  {this.state.articles.map((elem, idx) => <ArticleTile key={idx} accessable {...elem} />)}
			</InfiniteScroll>
		)
	}
}

export default BrowseArticles;
