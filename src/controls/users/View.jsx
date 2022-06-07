import React, {Component} from 'react';
import { server } from '../../api';
import Spinner from '../common/Spinner';
import UserWallet from '../UserWallet'
import BrowseArticles from '../articles/Browse.jsx'

class ViewUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			user: null
		};
		this.fetchUser = this.fetchUser.bind(this);
	}

	componentDidMount() {
		this.fetchUser()
	}

	fetchUser() {
		this.setState( { isLoading: true } )
		server.getUserProfile(this.props.id)
			.then(res => this.setState( { isLoading: false, user: res } ))
	}

	// fetchArticles

	render() {
		if (this.state.isLoading) return <Spinner />
		return (<div>
			<p>ID: {this.props.id} </p>
			<p>Desciption: {this.state.user.description || 'None'} </p>
			<BrowseArticles searchBy={{ author: this.props.id }} />
		</div>)
	}
}


export default ViewUser