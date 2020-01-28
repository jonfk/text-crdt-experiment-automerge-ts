import { combineReducers } from 'redux';
import { editorsReducer } from './editor';

const rootReducer = combineReducers({
  editors: editorsReducer
});

export default rootReducer;
