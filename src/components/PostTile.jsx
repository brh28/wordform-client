import React, {Component} from 'react';
import { StyledLink } from "baseui/link";
import PropTypes from 'prop-types';
import Rating from './Rating.jsx'
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Button } from "baseui/button";
import { useHistory } from "react-router-dom";

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

const PostTile = (props) => {
	const history = useHistory();

  function handleView() {
    history.push(`/articles/${props._id}`);
  }

  return (
    <Card
      overrides={{Root: {style: {width: '428px', margin: '10px'}}}}
      title={props.title}
    >
      <StyledBody>
        <Rating stats={props.ratings} />
        <Price amount={props.price} />
      </StyledBody>
      <StyledAction>
        <Button onClick={handleView} overrides={{BaseButton: {style: {width: '100%'}}}}>
          View
        </Button>
      </StyledAction>
    </Card>
  );
}

class Price extends Component {
	render() {
		return (
			this.props.amount === 0 ? <p>FREE</p> : <p>{this.props.amount} Sats</p>
		)
	}
}

// PostTile.propTypes = {
//   title: PropTypes.string.isRequired,
//   priceInfo: PropTypes.shape({  
//     amount: PropTypes.number.isRequired,
//     currency: PropTypes.string,
//   }).isRequired,
// };

// Price.propTypes = {
//   amount: PropTypes.number.isRequired,
//   currency: PropTypes.string,
// };

export default PostTile;
