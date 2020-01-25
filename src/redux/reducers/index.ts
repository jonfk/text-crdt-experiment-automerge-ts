import { combineReducers } from 'redux';
import {editorReducer} from './editor';

const rootReducer = combineReducers({ editor: editorReducer });

export default rootReducer;
