import React, {Component} from 'react';
import { StyledLink } from "baseui/link";
import PropTypes from 'prop-types';
import { ReadRatings } from '../Ratings'
import AuthorTag from '../../common/AuthorTag.jsx'
import {
  Card,
  StyledBody,
  StyledAction,
  StyledTitle
} from "baseui/card";
import { Button } from "baseui/button";
import { useHistory } from "react-router-dom";
import { Tag } from "baseui/tag";

// class PostTile extends Component {
// 	render() {
// 	  return (
// 	  	<div style={{
// 	  		border: '2px solid black',
// 	  		margin: '10px',
// 	  		padding: '10px',
// 	  		width: '50%'
// 	  	}}>
// 		    <h2>{this.props.title}</h2>
// 		    <Price {...this.props.priceInfo} />
// 		    <Rating stats={this.props.stats} />
// 		    <StyledLink href={`/articles/${this.props.id}`}>View</StyledLink>
// 	  	</div>
// 	  )
// 	}
// }

// const options = { year: 'numeric', month: 'short', day: 'numeric' };   
const LocalDate = ({ date }) => {
  if (date) {
    return <div>{new Date(date).toLocaleDateString('en-US')}</div>
  }
  return null
}

const PostTile = (props) => {
  const history = useHistory();
  function goTo() {
    history.push(`/articles/${props._id}`);
  }

  if (props.isPublished)
    return <Published {...props} onClick={goTo} />
  else
    return <Unpublished {...props} onClick={goTo} />
}

const Published = (props) => {
  return (
    <Card
      overrides={{
        Root: {style: {
          maxWidth: '350px', marginTop: '10px'
        }},
      }}
    >
      <StyledTitle 
        onClick={() => props.onClick()}
        style={{cursor: 'pointer'}}>
        {props.title}
      </StyledTitle>
      <StyledBody>
        <ReadRatings style={{ float: 'right' }} {...props.ratings} />
        <AuthorTag authorId={props.author} />
        <LocalDate date={props.publish_date} />
        <Price {...props.price} />
      </StyledBody>

    </Card>
  );
}

const Unpublished = (props) => {
  const history = useHistory();

  return (
    <Card
      overrides={{Root: {style: {
        maxWidth: '350px', margin: '10px'
      }}}}
    >
      <StyledTitle onClick={() => props.onClick()} style={{cursor: 'pointer'}}>
        <Tag overrides={{ Root: { style: { float: 'right', zIndex: 1 }}}} closeable={false}>Draft</Tag>
        {props.title}
      </StyledTitle>
      <StyledBody>
        <AuthorTag authorId={props.author} />
        <LocalDate date={props.publish_date} />
        <Price {...props.price} />
      </StyledBody>
    </Card>
  )
}

class Price extends Component {
	render() {
		return (
			this.props.amount === 0 ? <div>FREE</div> : <div>{this.props.amount} sats</div>
		)
	}
}

export default PostTile;
