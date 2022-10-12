
// TODO - look into different http lib. Why?
export default {
	browse: (searchParams) => {
		const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
	  const url = !searchParams || Object.keys(searchParams).length === 0
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
	newArticle: article => fetch("/api/articles", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(article)
    }),
    updateArticle: (id, article) => fetch(`/api/articles/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(article)
    }),
	getUserRating: (articleId) => {
		return fetch(`/api/articles/${articleId}/user/ratings`, {}).then(resp => resp.json())
	},
	postUserRating: (articleId, rating) => {
		return fetch(`/api/articles/${articleId}/user/ratings`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ rating })
      }).then(resp => resp.json())
	},
	getInvoice: (articleId) => fetch(`/api/articles/${articleId}/invoice`),
	getUserProfile: userId => fetch(`/api/users/${userId}`, {}).then(resp => resp.json()),
	updateUserDescription: (userId, desc) => fetch(`/api/users/${userId}/description`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ description: desc })
      }).then(resp => resp.json()),
	getUserWallet: userId => fetch(`/api/users/${userId}/wallet`, {}).then(resp => resp.json()),
	getLnurl: () => fetch(`/api/users/wallet/lnurl-withdraw`, {}).then(resp => resp.json()),
	updateWallet: wallet => fetch("/api/users/wallet", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(wallet)
      }),
	postUser: user => fetch("/api/users", { // should be /profile?
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
      }),
	updateAuth: (userId, updates) => fetch(`/api/users/${userId}/auth`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(updates)
      }),
	withdrawFunds: (userId, params) => fetch(`/api/users/${userId}/wallet/withdraw`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params) 
      }),
	login: userId => fetch(`/api/sessions/login`, {
  			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        }, 
	        body: JSON.stringify({ userId: userId })
	  	}),
	// lnSignature: signature => {
	// 	const params = new URLSearchParams()
	// 	params.set('sig', signature)
	// 	return fetch('/api/sessions/lnurl/signature')
	// },
	logout: () => fetch(`/api/sessions/logout`, {
  			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        }, 
	    }),
	getUserSession: () => {
	  const headers = new Headers();
	  headers.append('pragma', 'no-cache');
	  headers.append('cache-control', 'no-cache')
	  return fetch('/api/sessions/userId', {
	    headers: headers
	  }).then(resp => {
	  	if (resp.status === 403) {
	  		return null
	  	} else {
	  		return resp.json()
	  	}
	  })
	  // .then(resp => {
	  //   console.log(resp)
	    // if (resp.status === 403) {
	    //   localStorage.removeItem('userId')
	    //   window.location.reload(false)
	    // }
	  // })
	}
}
