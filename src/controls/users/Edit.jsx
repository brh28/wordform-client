import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { localStorage, server } from '../../api';
import Spinner from '../common/Spinner';
import UserWallet from '../UserWallet'
import BrowseArticles from '../articles/Browse.jsx'

class EditUser extends Component {
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

	render() {
		if (this.state.isLoading) return <Spinner />
		return (<div>
			<h1>Public</h1>
			<p>ID: {this.state.user._id} </p>
			<p>Desciption: {this.state.user.description || 'None'} </p>
			<h1>Private</h1>
			<h2>Authentication</h2>
			<h4>Linked Keys</h4>
			<ul>
				{ this.state.user.linking_keys.map(key => <li key={key}>{key}</li>)}
			</ul>
			<p>Keys required for authentication: {this.state.user.min_keys}</p>
			<p>Email: {this.state.user.email || 'None'} </p>
			<h2>Wallet</h2>
			<UserWallet userId={this.props.id} />
			<p>{this.state.user.auto_pay ? `Payment Node: ${this.state.user.destination_pub_key}` : 'Auto-pay: Off'}</p>
			<BrowseArticles searchBy={{ author: this.state.user._id }} />
		</div>)
	}
}


export default EditUser
