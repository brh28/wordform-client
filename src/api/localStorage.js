
const KEYS = {
	userId: 'userId'
}

export default {
	getUserId: () => localStorage.getItem(KEYS.userId),
	setUserId: id => localStorage.setItem(KEYS.userId, id),
	removeUserId: () => localStorage.removeItem(KEYS.userId)	
} 
// export const getUserId = () => localStorage.getItem(KEYS.userId) 		    			
// export const setUserId = id => localStorage.setItem(KEYS.userId, id)
// export const removeUserId = () => localStorage.removeItem(KEYS.userId)

// export const withUserId = ComposedComponent => <ComposedComponent {...this.props} userId={getUserId} />;