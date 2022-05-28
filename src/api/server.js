

export default {
	// TODO - look into different http lib
	browse: (searchParams) => {
		const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
	  const url = !searchParams || searchParams === {} 
	  	? `/api/articles` 
	  	: `/api/articles?${Object.keys(searchParams).map(key => `${key}=${searchParams[key]}`).join('&')}`
		return fetch(url, { headers:headers })
		      .then(res => res.json()) 
	},
	get: (articleId) => {
		return fetch(`/api/articles/${articleId}`, {}).then(resp => resp.json())
				// if (resp.status === 200 || resp.status === 402) {
				// 	resp.json()
				// } else {

				// }
	},
	deleteArticle: (articleId) => {
		return fetch(`/api/articles/${articleId}`, {
			method: "DELETE"
		})
	},
	postArticle: article => fetch("/api/article", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(article)
    }),
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
	getUserProfile: userId => fetch(`/api/users/${userId}/profile`, {}).then(resp => resp.json()),
	getUserWallet: userId => fetch(`/api/users/${userId}/wallet`, {}).then(resp => resp.json()),
	postUser: user => fetch("/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
      }),
	withdrawFunds: (userId, amount) => fetch(`/api/users/${userId}/wallet/withdraw`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        } 
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
	    }),
	getUserSession: () => {
	  const headers = new Headers();
	  headers.append('pragma', 'no-cache');
	  headers.append('cache-control', 'no-cache')
	  return fetch('/api/sessions/user', {
	    headers: headers
	  }).then(resp => resp.json())
	  // .then(resp => {
	  //   console.log(resp)
	    // if (resp.status === 403) {
	    //   localStorage.removeItem('userId')
	    //   window.location.reload(false)
	    // }
	  // })
	}
}
