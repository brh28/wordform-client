import React, {Component, useState, useEffect} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"
import Spinner, { SIZE } from "../../common/Spinner";
import { server } from "../../../api"

// for Reviews
import FormattedContent from './FormattedContent'
import { Button, KIND } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control"
//import Spinner from '../../common/Spinner';
//import { server } from "../../../api"
import { StyledLink } from "baseui/link";

const validateCharacterLength = (str, maxLength) => {
  let errorMsg
  if (str.length > maxLength) errorMsg = `-${str.length - maxLength}`
  return errorMsg
}

const UpDown = ({ rating, onClick }) => {
	const [css, theme] = useStyletron();
	const upCss = rating === 1 ? 'orange' : 'black'
	const downCss = rating === -1 ? 'orange' : 'black'
	return <div >
		    <ArrowUp size={64} 
		    	color={upCss} 
		    	style={{cursor: 'pointer'}} 
		    	onClick={() => onClick(1)}  />
		    <ArrowDown  size={64}
		    	color={downCss} 
		    	style={{cursor: 'pointer'}} 
		    	onClick={() => onClick(-1)} />
		  </div>;
}

const Review = ({ value, isEditting, error, onChange, onEdit, onSave, onCancel }) => { // onEdit
	if (isEditting) return (<FormControl 
          error={isEditting && error}> 
          	<div>
				<div style={{marginTop: '5px', marginBottom: '5px'}}>
					<Textarea
						autoFocus 
			            value={value}
			            error={error}
			            onChange={e => onChange(e.target.value)} />
				</div>
				<div style={{float: 'right'}}>
					<Button kind={KIND.primary} onClick={onSave}>Save</Button>
					<Button kind={KIND.secondary} onClick={onCancel}>Cancel</Button>
				</div>
			</div>  
	</FormControl>)
	else if (!value) return <StyledLink style={{cursor: 'pointer'}} onClick={onEdit}>Add a review</StyledLink>
	return ( // value && !isEditting
			<FormControl>
	        	<div style={{marginLeft: '5px', cursor: 'pointer'}} onClick={onEdit}>
					<FormattedContent style={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }} content={value} />
				</div>
			</FormControl>
		)
}

const RateContent = ({ articleId }) => {
	const [savedReview, setSavedReview] = useState(null)
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState(null);
	const [reviewError, setReviewError] = useState(null);
	const [isEditting, setEditting] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const fetchRating = () => {
		setLoading(true);
		server.getUserRating(articleId)
			.then(r => {
				setLoading(false);
				setRating(r.rating || 0);
				setSavedReview(r.review && r.review.value);
			})
	}
	useEffect(fetchRating, [])
	useEffect(() => setReview(savedReview), [savedReview])

	const saveRating = (clicked) => {
		const newRating = clicked === rating ? 0 : clicked
		setLoading(true);
		server.postUserRating(articleId, newRating)
			.then(r => {
				setLoading(false);
				setRating(r.rating);
			})
	}
	const saveReview = (val) => {
		setLoading(true);
		server.saveReview(articleId, review)
			.then((r) => {
				setLoading(false);
				if (r.error) setReviewError(r.error)
				else { 
					setSavedReview(r.review);
					setEditting(false);
				}
			})
	}
	const reset = () => {
		setReview(savedReview);
		setEditting(false);
		setReviewError(null);
	}

	return (
		<Spinner isActive={isLoading} size={SIZE.small}> 
			<UpDown rating={rating} onClick={saveRating} />
			<Review value={review} 
				isEditting={isEditting}
				error={reviewError}
				onChange={(val) => {
					setReview(val);
					setReviewError(validateCharacterLength(val, 1000));
				}}
				onEdit={() => setEditting(true)} 
				onSave={saveReview}
				onCancel={reset} />
		</Spinner>
	)
} 

export default RateContent




