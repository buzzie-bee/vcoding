import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { verifyAuth } from './actions/';
import rootReducer from './reducers';

export default function configureStore(persistedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  store.dispatch(verifyAuth());
  return store;
}
