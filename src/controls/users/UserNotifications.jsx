import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { server } from '../../api';
import { Info, Error } from '../common/Notifications'
import Spinner from '../common/Spinner'
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import { StyledLink } from "baseui/link";

const UserNotifications = ({ user, history }) => {
	const [isLoading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState(null);
	const [error, setError] = useState(null);

	const fetchNotifications = () => {
		setLoading(true);
		server.getNotifications(user)
			.then(r => {
				if (r.error) {
					setError(r.error);
				} else {
					setNotifications(r);
				}
				setLoading(false);
			})
			.catch(err => {
				setError('Request failed.');
				setLoading(false);
			})
	}
	useEffect(fetchNotifications, []);

	const onNotificationClick = notification => {
		history.push(notification.ref);
	    server.markAsRead([notification._id]);
	}

	const handleMarkAllAsRead = () => {
		setLoading(true);
		server.markAllAsRead()
			.then(r => {
				if (r.error) {
					setError(r.error);
					setLoading(false);
				} else {
					fetchNotifications(); // Optimize by returning Notifications in 1st response
				}
			})
			.catch(err => {
				setError('Request failed.');
				setLoading(false);
			})
	}

	if (error) return <Error message={error} />
	else if (!notifications || notifications.length === 0) return (<Info message='No updates at this time.' />)
	else return (<Spinner isActive={isLoading}>
		<StyledLink style={{cursor: 'pointer'}} onClick={handleMarkAllAsRead}>Mark all as read</StyledLink>
		<TableBuilder
			overrides={{Root: {style: {maxWidth: '800px' }}}}
	     	data={notifications}
	    >
	    	<TableBuilderColumn header='Date'>
	    		{n => <div style={{ cursor: 'pointer' }} onClick={() => onNotificationClick(n)}>
	    					{n.isRead ? n.created_at : <b>{n.created_at}</b>}
	    			</div>
	    		}
	    	</TableBuilderColumn>
	    	<TableBuilderColumn header='Message'>
	    		{n => <div style={{ cursor: 'pointer' }} onClick={() => onNotificationClick(n)}>
	    			{n.isRead ? n.message : <b>{n.message}</b>}
	    		</div>}
	    	</TableBuilderColumn>
	    </TableBuilder>
	</Spinner>) 
}

export default withRouter(UserNotifications)