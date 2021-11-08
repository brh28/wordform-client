

export default {
	browse: () => {
		const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
		return fetch(`/api/articles`, { headers:headers })
		      .then(res => res.json()) 
	},
	get: (articleId) => {
		return fetch(`/api/articles/${articleId}`, {}).then(resp => resp.json())
				// if (resp.status === 200 || resp.status === 402) {
				// 	resp.json()
				// } else {

				// }
	},
	getUserRating: (articleId) => {
		return fetch(`/api/user/ratings/${articleId}`, {}).then(resp => resp.json())
	},
	postUserRating: (articleId, rating) => {
		return fetch(`/api/user/ratings/${articleId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ rating })
      }).then(resp => resp.json())
	},
	// getInvoice: (articleId) => fetch(`/api/articles/${articleId}/invoice`),
	postArticle: article => fetch("/api/article", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(article)
      }),

	getUserProfile: userId => fetch(`/api/users/${userId}/profile`, {}).then(resp => resp.json()),
	getUserWallet: userId => fetch(`/api/users/${userId}/wallet`, {}).then(resp => resp.json()),
	postUser: user => fetch("/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
      }),
	login: userId => fetch(`/api/users/login`, {
  			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        }, 
	        body: JSON.stringify({ userId: userId })
	  	}),
	logout: () => fetch(`/api/users/logout`, {
  			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        }, 
	    })
}
