

export const articles = {
	browse: () => {
		const headers = new Headers();
	    // headers.append('withCredentials', true)
	    headers.append('Accepts', 'application/json')
		return fetch(`/api/articles`, { headers:headers })
		      .then(res => res.json()) 
	},
	get: (articleId) => fetch(`/api/articles/${articleId}`, {}),
	getInvoice: (articleId) => fetch(`/api/articles/${articleId}/invoice`),
	post: article => fetch("/api/article", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(article)
      })
}
