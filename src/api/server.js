
const removeUnusedFields = (obj) => Object.keys(obj).forEach(key => {
	if (!obj[key]) {
		delete obj[key];
	}
});

// TODO - look into different http lib. Why?
export default {
	browse: (searchParams) => {
		const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
	  	removeUnusedFields(searchParams)
		const url = !searchParams || searchParams.length === 0
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
  saveArticle: (id, article) => {
  	const url = id ? `/api/articles/${id}` : '/api/articles'
  	return fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(article)
    })
  },
  saveSummary: (articleId, newSummary) => fetch(`/api/articles/${articleId}/summary`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ summary: newSummary })
  }),
	getUserRating: (articleId) => {
		return fetch(`/api/articles/${articleId}/interactions`, {}).then(resp => resp.json())
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
	saveReview: (articleId, newReview) => fetch(`/api/articles/${articleId}/review`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ review: newReview })
    }).then(resp => resp.json()),
    getComments: (articleId, parentId) => {
		let url = `/api/articles/${articleId}/comments`
		if (parentId) url = url + `?parent=${parentId}`
		return fetch(url, {}).then(resp => resp.json())
	},
	postComment: (articleId, parent, comment) => fetch(`/api/articles/${articleId}/comment`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ parent: parent, comment: comment })
    }).then(resp => resp.json()),
	publishArticle: (articleId) => fetch(`/api/articles/${articleId}/publish`, {
        method: "POST",
        headers: {} 
      }),
	getNotifications: userId => fetch('/api/users/notifications', {}).then(resp => resp.json()),
	getUnreadNotificationsCount: () => fetch('/api/users/notifications/unreadCount', {}).then(resp => resp.json()),
	markAsRead: notificationIds => fetch(`/api/users/notifications`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(notificationIds.map(id => ({ id: id, isRead: true })))
      }).then(resp => resp.json()),
	markAllAsRead: () => fetch(`/api/users/notifications`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ allRead: true })
      }).then(resp => resp.json()),
	getUserProfile: userId => fetch(`/api/users/${userId}`, {}).then(resp => resp.json()),
	isUserAvailable: userId => fetch(`/api/users/${userId}/isAvailable`, {}).then(resp => resp.json()),
	updateUserDescription: (userId, desc) => fetch(`/api/users/${userId}/description`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ description: desc })
      }).then(resp => resp.json()),
	saveAvatar: (img) => {
		return fetch(`/api/users/avatar`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({avatar: img})
		})
		.then(resp => resp.json())
	},
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
	  })
	  .then(resp => {
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
