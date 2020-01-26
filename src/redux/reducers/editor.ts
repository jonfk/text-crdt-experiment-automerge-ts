import cuid from 'cuid';

import { TextBlock } from '../../types/models';
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

export function createEditorReducer(editorId: number) {
  return function editorReducer(
    state = initialState,
    action: EditorActionTypes
  ) {
    if (action.editorId !== editorId) {
      return state;
    }
    switch (action.type) {
      case SAVE_TEXT:
        return {
          ...state,
          text: changeTextDoc(state.text, action.payload.text)
        };
      case UPDATE_DRAFT_TEXT:
        return {
          ...state,
          draft: action.payload.text
        };
      default:
        return state;
    }
  };
}
