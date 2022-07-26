
const KEYS = {
	userId: 'userId'
}

export default {
	getUserId: () => {
		const strValue = localStorage.getItem(KEYS.userId)
		if (strValue === 'null') return null
		else return strValue
	},
	setUserId: id => localStorage.setItem(KEYS.userId, id),
	removeUserId: () => localStorage.removeItem(KEYS.userId)	
} 
