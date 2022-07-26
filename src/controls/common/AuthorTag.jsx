import React from 'react';
import { StyledLink } from "baseui/link";


// Todo - refactor to UserTag with prop 'id'
const AuthorTag = ({ authorId, style }) => {
	return <StyledLink href={`/users/${authorId}`}>@{authorId}</StyledLink>
}

export default AuthorTag