import cuid from 'cuid';
import produce, { Draft, castImmutable, castDraft} from 'immer';

import { TextBlock } from '../../types/models';
import {
  EditorActionTypes,
  SAVE_TEXT,
  UPDATE_DRAFT_TEXT,
  EditorId
} from '../../types/actions';
import changeTextDoc, { initDocWithText } from '../../utils/automerge';

export type EditorsState = Record<EditorId, TextBlock>;

const initialState: EditorsState = {
  0: {
    id: cuid(),
    text: initDocWithText('hello'),
    draft: ''
  },
  1: {
    id: cuid(),
    text: initDocWithText('hello'),
    draft: ''
  }
};

export const editorsReducer = (state: EditorsState = initialState, action: EditorActionTypes) => {
  switch (action.type) {
    case SAVE_TEXT:
      const editorState = state[action.editorId];
      const newTextDoc = changeTextDoc(editorState.text, action.payload.text);
      const newEditorState = {
        ...editorState,
        text: newTextDoc,
      };
      return {
        ...state,
        [action.editorId]: newEditorState,
      }
    case UPDATE_DRAFT_TEXT:
      return {
        ...state,
        [action.editorId]: {
          ...state[action.editorId],
          draft: action.payload.text,
        }
      };
    default:
        return state;
  }
};
