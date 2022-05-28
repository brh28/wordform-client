import React from 'react';
import { withRouter } from "react-router";
import EditUser from './Edit.jsx'
import ViewUser from './View.jsx'


// In a common directory,
// 1) Make UserController with props:
//		viewerId,
//		of
// 2) Create ViewUser and EditUser

const UserController = (props) => {
	const profileId = props.match.params.id
	const { viewerId } = props

	if (profileId === viewerId)
		return <EditUser id={profileId} />
	else
		return <ViewUser id={profileId} />
}

export default withRouter(UserController)