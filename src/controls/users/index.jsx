import React from 'react';
import { withRouter } from "react-router";
import Self from './Self.jsx'
import PublicProfile from './PublicProfile.jsx'

const UserController = (props) => {
	const profileId = props.match.params.id
	if (profileId === props.viewerId)
		return <Self id={profileId} />
	else
		return <PublicProfile id={profileId} />
}

export default withRouter(UserController)