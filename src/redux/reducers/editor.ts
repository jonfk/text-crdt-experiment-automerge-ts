import cuid from 'cuid';
import { combineReducers } from 'redux';

import { TextBlock, initTextDoc } from '../../types/models';
import {
  EditorActionTypes,
  SAVE_TEXT,
  UPDATE_DRAFT_TEXT
} from '../../types/actions';
import changeTextDoc, { initDocWithText } from '../../utils/automerge';

const initialState: TextBlock = {
  id: cuid(),
  text: initDocWithText('hello'),
  draft: ''
};

export function editorReducer(state = initialState, action: EditorActionTypes) {
  switch (action.type) {
    case SAVE_TEXT:
      return {
        ...state,
        text: changeTextDoc(state.text, action.payload.text),
      };
    case UPDATE_DRAFT_TEXT:
      return {
        ...state,
        draft: action.payload.text
      };
    default:
      return state;
  }
}

export type EditorState = ReturnType<typeof editorReducer>;
