import {
  UPDATE_DRAFT_TEXT,
  SAVE_TEXT,
  EditorActionTypes
} from '../types/actions';

export function saveTextBlock(id: string, text: string): EditorActionTypes {
  return {
    type: SAVE_TEXT,
    payload: {
      id: id,
      text: text
    }
  };
}

export function updateDraftText(text: string): EditorActionTypes {
  return {
    type: UPDATE_DRAFT_TEXT,
    payload: {
      text: text
    }
  };
}
