import React from 'react';
import { withRouter } from "react-router";
import Invoice from '../../common/Invoices'
import TitleBar from './TitleBar'
import { Error } from '../../common/Notifications.jsx'
import { StyledLink } from "baseui/link";
import ArticleSummary from './ArticleSummary'
import ReadReviews from './ReadReviews'
import { ReadRatings } from '../Ratings'
import { Info } from '../../common/Notifications'

const ReadPaywall = ({ user, title, author, summary, ratings, reviews, publish_date, price, paymentRequest, history }) => {
	
	return <div>
		<TitleBar title={title} author={author} publish_date={publish_date} price={price} />
		<hr />
		<ArticleSummary summary={summary} />
		{user 
			? <Invoice paymentRequest={paymentRequest} />
			: <Error message={(<p><StyledLink style={{cursor: 'pointer'}} onClick={() => history.push('/login', { returnUrl: history.location.pathname })}>Sign in</StyledLink> to view paywall content</p>)} /> 
		}
		<ReadRatings {...(ratings || {likes:0, dislikes: 0})} />
		{ reviews && reviews.length > 0 ? <ReadReviews reviews={reviews} /> : <Info message='There are no reviews for this content.' />}
	</div>
}

export default withRouter(ReadPaywall)