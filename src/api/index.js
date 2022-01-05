import { useState, useEffect, useCallback } from 'react';
import localStorage from './localStorage'

export {default as localStorage} from './localStorage'
export {default as server} from './server'
export const useLocalStorage = () => {
	  const [currentValue, setState] = useState(localStorage.getUserId()) // ?? initialState);

	  const setUserId = useCallback(
	    newValue => {
	    	if (currentValue && (!newValue )) { // || typeof newValue === 'undefined'
	    		localStorage.removeUserId()
	    		window.location.reload(false) 
	    	}
	    	// if (currentValue && typeof newValue === 'undefined') {
	    	// 	localStorage.removeUserId()
	    	// 				// window.location.reload(false) 
	    	// }
			// if (currentValue !== newValue) {
			// 	console.log('Caching User id: ' + newValue)
			// 	localStorage.setUserId(newValue);
			// 				// window.location.reload(false) 
			// 	// setState(newValue);
			// 				//window.location.reload(false) 
			// }
			// setState(newValue);
	    },
	    [currentValue]
	  );

	  return [currentValue, setUserId];
	}



// import localStorage from './localStorage'
// import server from './server'

// export localStorage
// export server

// export default {
// 	localStorage: localStorage,
// 	server: server,
	// useLocalStorage: () => {
	//   const [userId, setState] = useState(localStorage.getUserId()) // ?? initialState);

	//   const setUserId = useCallback(
	//     newValue => {
	//       localStorage.setUserId(newValue);
	//       setState(newValue);
	//     },
	//     [userId]
	//   );

	//   return [userId, setUserId];
	// }
// }