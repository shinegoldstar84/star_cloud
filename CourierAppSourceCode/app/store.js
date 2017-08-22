import { createStore, applyMiddleware }		from 'redux';
import logger								from 'redux-logger';
import thunk								from 'redux-thunk';
import reducer								from './reducers';
import ScreenTracker						from './navigators/ScreenTracker';

export const store = createStore( reducer, {}, applyMiddleware( thunk,/* logger,*/ ScreenTracker ) );