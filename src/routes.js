export default {
	root: '/',
	articles: {
		controller: {
			go: articleId => `/articles/${articleId}`,
			match: '/articles/:id'
		},
		create: '/articles/new', 
		publish: {
			go: articleId => `/articles/${articleId}/publish`,
			match: '/articles/:id/publish'
		}
	},
	users: {
		create: '/users/new',
		controller: {
			go: userId => `/users/${userId}`,
			match: '/users/:id'
		},
		login: '/login'
	}

}