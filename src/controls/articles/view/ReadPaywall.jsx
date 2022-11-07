import React from 'react';
import { withRouter } from "react-router";
import Invoice from '../../common/Invoices'
import TitleBar from './TitleBar'
import { Error } from '../../common/Notifications.jsx'
import { StyledLink } from "baseui/link";
import ArticleSummary from './ArticleSummary'

const ReadPaywall = ({ user, title, author, summary, publish_date, price, paymentRequest, history }) => {
	return <div>
		<TitleBar title={title} author={author} publish_date={publish_date} price={price} />
		<hr />
		<ArticleSummary summary={summary} />
		{user 
			? <Invoice paymentRequest={paymentRequest} />
			: <Error message={(<p><StyledLink style={{cursor: 'pointer'}} onClick={() => history.push('/login')}>Sign in</StyledLink> to view paywall content</p>)} /> 
		}
	</div>
}

export default withRouter(ReadPaywall)