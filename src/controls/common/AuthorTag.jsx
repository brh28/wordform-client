import React from 'react';
import { StyledLink } from "baseui/link";

const AuthorTag = (props) => {
	const { authorId } = props
	return <StyledLink href={`/users/${authorId}`}>@{authorId}</StyledLink>
}

export default AuthorTag