import React, {Component, useState} from 'react';
import BrowseArticles from '../../articles/Browse.jsx'
import Header from './Header'

class PublicProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false, // set to true when fetching
			user: null
		};
		// this.fetchUser = this.fetchUser.bind(this);
	}

	render() {
		return (
			<div>
				<Header userId={this.props.id} 
					editable={this.props.editable} />
	          	<BrowseArticles searchBy={{ author: this.props.id }} />
			</div>
		)
	}
}

export default PublicProfile