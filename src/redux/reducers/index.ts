import { combineReducers } from 'redux';
import { createEditorReducer } from './editor';

const rootReducer = combineReducers({
  editor0: createEditorReducer(0),
  editor1: createEditorReducer(1)
});

export default rootReducer;
