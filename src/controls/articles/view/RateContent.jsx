import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"
import Spinner, { SIZE } from "../../common/Spinner";
import { server } from "../../../api"

// const ArrowUp = ({highlighted, onClick}) => {
// 	return <span style={{cursor: 'pointer'}} onClick={onClick}>&#10507;</span>
// }
// // const ArrowDown = ({onClick}) => <span style={{color: 'yellow', transform: `scale(.5, 2)`}}>&#8681;</span>
// const ArrowDown = ({highlighted, onClick}) => <span>&#8681;</span>



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

class RateContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			rating: 0
		}
		this.fetchRating = this.fetchRating.bind(this);
		this.saveRating = this.saveRating.bind(this);
	}

	componentDidMount() {
		this.fetchRating()
	}

	fetchRating() {
		this.setState({ isLoading: true })
		server.getUserRating(this.props.articleId)
			.then(r => {
				this.setState({
					isLoading: false,
					rating: r.rating
				})
			})
	}

	saveRating(clicked) {
		const newRating = clicked === this.state.rating ? 0 : clicked
		this.setState({ isLoading: true })
		server.postUserRating(this.props.articleId, newRating)
			.then(r => {
				this.setState({
					isLoading: false,
					rating: r.rating
				})
			})
	}

	render() {
		return (
			<Spinner isActive={this.state.isLoading} size={SIZE.small}> 
				<UpDown rating={this.state.rating} onClick={this.saveRating} />
			</Spinner>
		)
	}
}

export default RateContent




