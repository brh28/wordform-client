

export const articles = {
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
	// getInvoice: (articleId) => fetch(`/api/articles/${articleId}/invoice`),
	post: article => fetch("/api/article", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(article)
      })
}

export const users = {
	post: user => fetch("/api/user", {
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
