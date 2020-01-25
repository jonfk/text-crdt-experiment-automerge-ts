import cuid from 'cuid';
import { combineReducers } from 'redux';

import { TextBlock } from '../../types/models';
import { EditorActionTypes, SAVE_TEXT } from '../../types/actions';
import { saveTextBlock } from '../actions';

const initialState: TextBlock = {
  id: cuid(),
  text: 'hello',
};

export function editorReducer(state = initialState, action: EditorActionTypes) {
  switch(action.type) {
    case SAVE_TEXT:
      return {
        ...state, text: action.payload.text
      };
      default:
        return state;
  }
}

export type EditorState = ReturnType<typeof editorReducer>;
