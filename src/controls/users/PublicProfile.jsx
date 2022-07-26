import React, {Component} from 'react';
import { server } from '../../api';
import Spinner from '../common/Spinner';
import AuthorTag from '../common/AuthorTag.jsx'
import BrowseArticles from '../articles/Browse.jsx'

class PublicProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false, // set to true when fetching
			user: null
		};
		this.fetchUser = this.fetchUser.bind(this);
	}

	componentDidMount() {
		// this.fetchUser()
	}

	fetchUser() {
		this.setState( { isLoading: true } )
		server.getUserProfile(this.props.id)
			.then(res => this.setState( { isLoading: false, user: res } ))
	}

	render() {
		return (
			<Spinner isActive={this.state.isLoading}>
			  <AuthorTag authorId={this.props.id} />
	          <BrowseArticles searchBy={{ author: this.props.id }} />
			</Spinner>
		)
	}
}

export default PublicProfile