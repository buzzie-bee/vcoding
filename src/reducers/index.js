import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
// import auth from './auth';
// import firestoreReducers from './firestoreReducers';

// export default combineReducers({ auth, firestoreReducers });
export default combineReducers({ dataReducer });
