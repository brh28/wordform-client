import React from 'react';
import { withRouter } from "react-router";
import PrivateProfile from './profile/PrivateProfile.jsx'
import PublicProfile from './profile/PublicProfile.jsx'

export const PATH = '/users/:id';
export const href = id => `/users/${id}`

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

export default Object.assign(withRouter(UserController), { PATH: PATH, href: href });
