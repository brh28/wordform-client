import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from "baseui/icon/arrow-up"
import ArrowDown from "baseui/icon/arrow-down"
import Spinner from "../../common/Spinner";
import { server } from "../../../api"

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
		return <div>
			<label>Was this article worth your time and money?</label> 
			{this.state.isLoading ? <Spinner /> : <UpDown rating={this.state.rating} onClick={this.saveRating} />}
		</div>
	}
}

export default RateContent




const UpDown = ({ rating, onClick }) => {
	const [css, theme] = useStyletron();
	const upCss = rating === 1 ? css({color: theme.colors.warning}) : null
	const downCss = rating === -1 ? css({color: theme.colors.warning}) : null
	return <div >
		    <span className={upCss}><ArrowUp onClick={() => onClick(1)} size={32} /></span>
		    <span className={downCss}><ArrowDown onClick={() => onClick(-1)} size={32} /></span>
		  </div>;
}