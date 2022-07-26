import { useState, useEffect, useCallback } from 'react';
import localStorage from './localStorage'
import React from 'react';

export {default as localStorage} from './localStorage'
export {default as server} from './server'

export const User = React.createContext()

// export const useLocalStorage = () => {
// 	  const [currentValue, setState] = useState(localStorage.getUserId()) // ?? initialState);

// 	  const setUserId = useCallback(
// 	    newValue => {
// 	    	console.log('setUserId(' + newValue + ')')

// 	    	if (!newValue) { // || typeof newValue === 'undefined'
// 	    		localStorage.removeUserId()
// 	    		//window.location.reload(false) 
// 	    	} else {
// 	    		localStorage.setUserId(newValue)
// 	    		setState(newValue)
// 	    	}
	    	
// 	    	// if (currentValue && typeof newValue === 'undefined') {
// 	    	// 	localStorage.removeUserId()
// 	    	// 				// window.location.reload(false) 
// 	    	// }
// 			// if (currentValue !== newValue) {
// 			// 	console.log('Caching User id: ' + newValue)
// 			// 	localStorage.setUserId(newValue);
// 			// 				// window.location.reload(false) 
// 			// 	// setState(newValue);
// 			// 				//window.location.reload(false) 
// 			// }
// 			// setState(newValue);
// 	    },
// 	    [currentValue]
// 	  );

// 	  return [currentValue, setUserId];
// 	}

// universal userId accessor
// export const userId = () => 



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