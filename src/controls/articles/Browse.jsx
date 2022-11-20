import React, { useState, useEffect } from 'react';
import Spinner from '../common/Spinner';
import ArticleTile from './view/Tile.jsx'
import { localStorage, server } from '../../api';
import { Info, Error } from '../common/Notifications'
import InfiniteScroll from 'react-infinite-scroll-component';

const BrowseArticles = ({ searchBy }) => {
	const [articles, setArticles] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);

  	const fetchData = (articles) => {
  		const searchParams = searchBy || {}
  		const lastEl = articles.at(-1)
  		if (lastEl) { searchParams.before = lastEl.purchase_date }		
  		server.browse(searchParams)
			.then(
		        (resp) => {
		        	setLoading(false);
		        	setArticles(articles.concat(resp.results));
		        	setHasMore(resp.hasMore);

		        },
		        (error) => {
		        	setLoading(false);
		        	setError(error);
		        }
		      )
  	}


  	useEffect(() => {
  		fetchData([]); 
  	}, [searchBy])

	if (!isLoading && articles.length === 0) return <Info message='No articles' />
	else return (
		<InfiniteScroll
		  dataLength={articles.length} 
		  next={() => fetchData(articles)}
		  hasMore={hasMore}
		  loader={<Spinner isActive={true} />}
		>
		  {articles.map((elem, idx) => <ArticleTile key={idx} accessable {...elem} />)}
		</InfiniteScroll>
	)
}

export default BrowseArticles;
