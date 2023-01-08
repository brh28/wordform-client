import React from 'react';
import { withRouter } from "react-router";
import PrivateProfile from './profile/PrivateProfile.jsx'
import PublicProfile from './profile/PublicProfile.jsx'

const UserController = (props) => {
	const { notificationCount, setNotificationCount } = props
	const profileId = props.match.params.id
	if (profileId === props.viewerId)
		return <PrivateProfile id={profileId} 
					notificationCount={notificationCount} 
					setNotificationCount={setNotificationCount} />
	else
		return <PublicProfile id={profileId} />
}

export default withRouter(UserController)